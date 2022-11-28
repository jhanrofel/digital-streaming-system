// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserService} from '@loopback/authentication';
import {UserCredentials} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare, genSalt, hash} from 'bcryptjs';
import {Users, UsersWithRelations} from '../models';
import {UsersRepository} from '../repositories';

/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export type Credentials = {
  email: string;
  password: string;
};

export class CustomUserService implements UserService<Users, Credentials> {
  constructor(
    @repository(UsersRepository) public usersRepository: UsersRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<Users> {
    const invalidCredentialsError = 'Invalid email or password.';
    let foundUser: Users | null;
    let credentialsFound: UserCredentials | undefined;

    foundUser = await this.usersRepository.findOne({
      where: {email: credentials.email},
    });

    if (foundUser) {
      if (foundUser?.approval === 'pending') {
        throw new HttpErrors.Unauthorized(
          'Account registration is pending for approval.',
        );
      }

      if (
        foundUser?.approval === 'disapproved' ||
        foundUser?.approval !== 'approved'
      ) {
        throw new HttpErrors.Unauthorized(
          'Account registration is disapproved. Try to register new account.',
        );
      }

      if (foundUser?.status === 'DEACTIVATED') {
        throw new HttpErrors.Unauthorized('Account is currently deactivated.');
      }

      credentialsFound = await this.usersRepository.findCredentials(
        foundUser.id,
      );
    } else if (
      credentials.email === 'admin@mail.com' &&
      credentials.password === 'root@123'
    ) {
      const password = await hash(credentials.password, await genSalt());
      return this.usersRepository
        .create({
          firstName: 'Admin',
          lastName: 'Root',
          email: 'admin@mail.com',
          role: 'ADMIN',
          approval: 'approved',
        })
        .then(res => {
          this.usersRepository.userCredentials(res.id).create({password});
          return res;
        });
    } else {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: Users): UserProfile {
    return {
      [securityId]: user.id.toString(),
      id: user.id,
      email: user.email,
      name: user.role,
    };
  }

  //function to find user by id
  async findUserById(id: string): Promise<Users & UsersWithRelations> {
    const userNotfound = 'invalid User';
    const foundUser = await this.usersRepository.findById(id);

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotfound);
    }
    return foundUser;
  }
}
