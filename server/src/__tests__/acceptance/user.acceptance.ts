import {DigitalStreamingSystemApplication} from '../..';
import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {
  givenEmptyDatabase,
  givenUsersData,
  givenUsersRepositories,
  mockUser,
  mockUserRegistrationApproval,
} from '../helper';
import {testdb} from '../datasource/testdb.datasource';
import {UsersRepository} from '../../repositories';

describe('User Acceptance Controller', () => {
  let app: DigitalStreamingSystemApplication;
  let client: Client;
  let usersRepository: UsersRepository;

  before(givenEmptyDatabase);
  before(givenRunningApp);
  before(async () => {
    ({usersRepository} = await givenUsersRepositories(app));
  });

  after(async () => {
    await app.stop();
  });

  it('retrieves selected users', async () => {
    // arrange
    const user = await usersRepository.create(givenUsersData(mockUser));
    const expected = Object.assign({id: user.id}, user);

    // act
    const response = await client.get(`/users/${user.id}`);

    // assert
    expect(response.body).to.containEql(expected);
  });

  it('approved pending registration', async () => {
    // arrange
    const newUserRegister = mockUserRegistrationApproval;
    await usersRepository.updateById(newUserRegister.id, {
      ...mockUserRegistrationApproval,
      approval: 'approved',
    });
    const expected = Object.assign({id: newUserRegister.id}, newUserRegister);

    // act
    const response = await client.post(`/users/register-approval`);

    // assert
    expect(response.body).to.containEql(expected);
  });

  async function givenRunningApp() {
    app = new DigitalStreamingSystemApplication({
      rest: {
        port: 0,
      },
    });
    await app.boot();

    // change to use the test datasource after the app has been booted so that
    // it is not overridden
    app.dataSource(testdb);
    await app.start();

    client = createRestAppClient(app);
  }
});
