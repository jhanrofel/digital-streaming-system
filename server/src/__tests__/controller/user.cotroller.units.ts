import {
  JWTService,
  MyUserService,
  RefreshtokenService,
  UserCredentialsRepository,
  UserRepository,
} from '@loopback/authentication-jwt';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UsersController} from '../../controllers';
import {Users} from '../../models';
import {UsersRepository} from '../../repositories';
import {givenUsers} from '../helper';
import {UserProfile} from '@loopback/security';

let controller: UsersController;

describe('User Unit Controller', () => {
  let usersRepository: StubbedInstanceWithSinonAccessor<UsersRepository>;
  let userRepo: StubbedInstanceWithSinonAccessor<UserRepository>;
  let usersCredentialsRepo: StubbedInstanceWithSinonAccessor<UserCredentialsRepository>;
  let jwtService: StubbedInstanceWithSinonAccessor<JWTService>;
  let userService: StubbedInstanceWithSinonAccessor<MyUserService>;
  let userProfile: StubbedInstanceWithSinonAccessor<UserProfile>;
  let refreshToken: StubbedInstanceWithSinonAccessor<RefreshtokenService>;

  beforeEach(resetRepositories);

  // it('should return list of users', async () => {
  //   const find = usersRepository.stubs.find;

  //   find.resolves(givenUsers as Users[]);
  //   expect(await controller.find()).to.eql(givenUsers);

  //   sinon.assert.called(find);
  // });

  function resetRepositories() {
    usersRepository = createStubInstance(UsersRepository);
    userRepo = createStubInstance(UserRepository);
    usersCredentialsRepo = createStubInstance(UserCredentialsRepository);
    jwtService = createStubInstance(JWTService);
    userService = createStubInstance(MyUserService);
    refreshToken = createStubInstance(RefreshtokenService);
    controller = new UsersController(
      usersRepository,
      userRepo,
      usersCredentialsRepo,
      jwtService,
      userService,
      userProfile,
      refreshToken,
    );
  }
});
