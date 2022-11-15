// import {Client, createRestAppClient, expect, toJSON} from '@loopback/testlab';
// import _ from 'lodash';
// import {DigitalStreamingSystemApplication} from '../../application';
// import {UsersRepository} from '../../repositories';
// import {
// //   createAdmin,
// //   createCustomUser,
// //   givenRootAdmin,
//   givenRunningApplicationWithCustomConfiguration,
// //   givenUser,
// //   login,
// } from '../helper';

// describe('UserController', () => {
//   let app: DigitalStreamingSystemApplication;
//   let client: Client;
//   let userRepo: UsersRepository;
//   let adminToken = '';

//   before(async () => {
//     app = await givenRunningApplicationWithCustomConfiguration();
//   });
//   after(() => app.stop());

//   before(givenUserRepository);
//   before(() => {
//     client = createRestAppClient(app);
//   });

//   context('As admin', () => {
//     const newUser = {
//         firstName: "John",
//         lastName: "Smith",
//         email: "john.smith@mail.com",
//         password: "pass@123",
//     }
//     it('Should get all users', async () => {
//       const response = await client.post(`/users/register`).expect(200).send(newUser);
//       console.log(response);
//     });
//   });

//   async function givenUserRepository() {
//     userRepo = await app.getRepository(UsersRepository);
//   }
// });