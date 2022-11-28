import {Filter, repository} from '@loopback/repository';
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
import {Users} from '../models';
import {UsersRepository, UserCredentialsRepository} from '../repositories';
import {
  UsersLoginSchema,
  UsersPatchSchema,
  UsersRegisterSchema,
  RefreshGrantSchema,
} from '../schemas';
import {inject} from '@loopback/core';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  UserServiceBindings,
  UserRepository,
  RefreshTokenServiceBindings,
  RefreshtokenService,
} from '@loopback/authentication-jwt';
import {authenticate, TokenService} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {
  IUserApiResponse,
  IUserApiTokenResponse,
  IUserRegister,
} from '../utilities/types';
import {catchError} from '../utilities/helpers';

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
    @inject(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE)
    public refreshService: RefreshtokenService,
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
    register: IUserRegister,
  ): Promise<IUserApiResponse> {
    const password = await hash(register.password, await genSalt());
    return this.usersRepository
      .create(_.omit(register, 'password'))
      .then(async user => {
        await this.usersRepository.userCredentials(user.id).create({password});
        return {
          status: 'success',
          message: 'Registration success. Please wait for approval.',
          users: [user],
        };
      })
      .catch(error => catchError(error));
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
  ): Promise<IUserApiResponse> {
    return this.usersRepository
      .findById(currentUserProfile[securityId])
      .then(user => ({
        status: 'success',
        message: 'Current user details.',
        users: [user],
      }))
      .catch(error => catchError(error));
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users),
        },
      },
    },
  })
  async find(
    @param.filter(Users)
    filter?: Filter<Users>,
  ): Promise<IUserApiResponse> {
    return this.usersRepository
      .find(filter)
      .then(users => ({
        status: 'success',
        message: 'Users list',
        users: users,
      }))
      .catch(error => catchError(error));
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
  async findById(
    @param.path.string('id') id: string,
  ): Promise<IUserApiResponse> {
    return this.usersRepository
      .findById(id)
      .then(user => ({
        status: 'success',
        message: 'User found',
        users: [user],
      }))
      .catch(error => catchError(error));
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
  ): Promise<IUserApiResponse> {
    return this.usersRepository
      .updateById(id, users)
      .then(() => ({status: 'success', message: 'Users updated'}))
      .catch(error => catchError(error));
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<IUserApiResponse> {
    await this.usersRepository.userReviews(id).delete();
    await this.userCredentialsRepository.deleteAll({userId: id});
    return this.usersRepository
      .deleteById(id)
      .then(() => ({status: 'success', message: 'User deleted'}))
      .catch(error => catchError(error));
  }

  /**
   * Users login
   * @response object tokens {accessToken, refreshToken}
   */
  @post('/users/login')
  @response(200, {
    description: 'Users Refresh Login',
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
  ): Promise<IUserApiTokenResponse> {
    return this.userService
      .verifyCredentials(credentials)
      .then(foundUser => this.userService.convertToUserProfile(foundUser))
      .then(async userProfile => {
        const accessToken = await this.jwtService.generateToken(userProfile);
        const tokens = await this.refreshService.generateToken(
          userProfile,
          accessToken,
        );
        return {status: 'success', message: 'Valid user', tokens: tokens};
      })
      .catch(error => catchError(error));
  }

  @post('/users/refresh-token')
  @response(200, {
    description: 'Token',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'object',
            },
          },
        },
      },
    },
  })
  async refresh(
    @requestBody({
      description: 'Reissuing Acess Token',
      required: true,
      content: {
        'application/json': {schema: RefreshGrantSchema},
      },
    })
    token: {
      refreshToken: string;
    },
  ): Promise<IUserApiResponse> {
    return this.refreshService
      .refreshToken(token.refreshToken)
      .then(newToken => ({status: 'success', message: newToken.accessToken}));
  }
}
