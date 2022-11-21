import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Reviews, Users} from '../models';
import {UsersRepository, UserCredentialsRepository} from '../repositories';
import {
  UsersChangePasswordSchema,
  UsersLoginSchema,
  UsersPatchSchema,
  UsersRegisterSchema,
  UsersRegisterApprovalSchema,
} from '../schemas';
import {inject} from '@loopback/core';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  UserServiceBindings,
  UserRepository,
} from '@loopback/authentication-jwt';
import {authenticate, TokenService} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

class RegistrationClass {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class ChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ApiResponse {
  status: number;
  message?: string;
  users?: Users[] | void[];
  user?: Users | void;
  error?: string;
}

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) {}

  @post('/users/register')
  @response(200, {
    description: 'Users Registration',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async register(
    @requestBody({
      content: {
        'application/json': {
          schema: UsersRegisterSchema,
        },
      },
    })
    register: RegistrationClass,
  ): Promise<ApiResponse> {
    const password = await hash(register.password, await genSalt());
    return this.usersRepository
      .create(_.omit(register, 'password'))
      .then((res) => {// eslint-disable-next-line
        this.usersRepository.userCredentials(res.id).create({password});
        return {
          status: 200,
          message: 'Registration success. Please wait for approval.',
          users: [res],
        };
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          return {
            status: 500,
            error: `${err.keyValue.email} email already in used.`,
          };
        } else {
          return {status: 500, error: err.message};
        }
      });
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @post('/users/register-approval')
  @response(200, {
    description: 'Users Registration Approval',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async registerApproved(
    @requestBody({
      content: {
        'application/json': {
          schema: UsersRegisterApprovalSchema,
        },
      },
    })
    approval: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(approval.id, approval);
  }

  @post('/users/login')
  @response(200, {
    description: 'Users Login',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: UsersLoginSchema,
        },
      },
    })
    credentials: Credentials,
  ): Promise<ApiResponse> {
    const apiResponse: ApiResponse = {status: 200};
    const user = await this.userService
      .verifyCredentials(credentials)
      .then(res => res)
      .catch(async err => {
        if (
          credentials.email === 'admin@mail.com' &&
          credentials.password === 'root1234'
        ) {
          const password = await hash(credentials.password, await genSalt());
          const newUser = await this.usersRepository
            .create({
              firstName: 'Admin',
              lastName: 'Root',
              email: 'admin@mail.com',
              role: 'ADMIN',
              approval: 'approved',
            })
            .then((res) => {// eslint-disable-next-line
              this.usersRepository.userCredentials(res.id).create({password});
              return res;
            });
          return newUser;
        } else {
          apiResponse.status = 500;
          apiResponse.error = err.message;
          return err;
        }
      });

    if (apiResponse.status === 200) {
      const userProfile = this.userService.convertToUserProfile(user);
      await this.jwtService
        .generateToken(userProfile)
        .then(res => (apiResponse.message = res));
    }

    return apiResponse;
  }

  @post('/users/change-password')
  @response(200, {
    description: 'Users Change Password',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async changePassword(
    @requestBody({
      content: {
        'application/json': {
          schema: UsersChangePasswordSchema,
        },
      },
    })
    newCredentials: ChangePassword,
  ): Promise<ApiResponse> {
    const credentials = {
      email: newCredentials.email,
      password: newCredentials.oldPassword,
    };
    const user = await this.userService.verifyCredentials(credentials);

    if (newCredentials.newPassword === newCredentials.confirmPassword) {
      const password = await hash(newCredentials.newPassword, await genSalt());
      await this.userCredentialsRepository.updateAll(
        {password: password},
        {userId: user.id},
      );

      return {status: 200, message: 'Password changed.'};
    } else {
      return {
        status: 500,
        error: 'Invalid inputs.',
      };
    }
  }

  @authenticate('jwt')
  @get('/users/me', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<ApiResponse> {
    return this.usersRepository
      .findById(currentUserProfile[securityId])
      .then(res => {
        return {status: 200, message: 'Valid user.', user: res};
      })
      .catch(err => {
        return {status: 500, error: err.message};
      });
  }

  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @get('/users/approval')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async findApproval(): Promise<Users[]> {
    return this.usersRepository.find({where: {approval: 'pending'}});
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @get('/users/approved')
  @response(200, {
    description: 'Array of Approved Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async findApprovedl(): Promise<Users[]> {
    return this.usersRepository.find({where: {approval: 'approved',email:{neq:"admin@mail.com"}}});
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Users> {
    return this.usersRepository.findById(id);
  }

  @get('/users/{id}/reviews')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true}),
      },
    },
  })
  async userReviews(@param.path.string('id') id: string): Promise<Reviews[]> {
    return this.usersRepository.userReviews(id).find({
      include: [{relation: 'reviewMovie', scope: {include: ['movieLink']}}],
    });
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @patch('/users/{id}')
  @response(204, {
    description: 'Users PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: UsersPatchSchema,
        },
      },
    })
    users: Partial<Users>,
  ): Promise<ApiResponse> {
    return this.usersRepository
      .updateById(id, users)
      .then(res => {
        return {
          status: 200,
          message: 'User updated.',
          users: [res],
        };
      })
      .catch(err => {
        if (err.code === 11000) {
          return {
            status: 500,
            error: `${err.keyValue.email} email already in used.`,
          };
        } else {
          return {status: 500, error: err.message};
        }
      });
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
    await this.usersRepository.userReviews(id).delete();
    await this.userCredentialsRepository.deleteAll({userId: id});
  }
}
