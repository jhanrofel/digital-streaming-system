import {givenHttpServerConfig} from '@loopback/testlab';
import {DigitalStreamingSystemApplication} from '../application';
import {Actors, Movies, MovieActor, Reviews, UserCredentials, Users } from '../models';
import {ActorsRepository, UsersRepository} from '../repositories';

export function givenAdmin(user?: Partial<Users>) {
  const data = Object.assign(
    {
      firstName: 'root',
      lastName: 'admin',
      email: 'root@admin.com',
      role: 'ADMIN',
      password: 'pass1234',
    },
    user,
  );
  return new Users(data);
}

export function givenActor(actor?: Partial<Actors>) {
  const data = Object.assign(
    {
      firstName: 'Tom',
      lastName: 'Hollands',
      gender: 'Male',
      birthday: '01-01-1999',
      imageLink:
        'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR6bMpT-g99Sl1A9UtU6L5X4VcN_ADVkV2pKsFD2TTW2jDDRN1asWn7ZbyrjZ8nan3tZn38A9dnHmpRhZg',
    },
    actor,
  );
  return new Actors(data);
}


export async function givenRunningApplicationWithCustomConfiguration() {
  const app = new DigitalStreamingSystemApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();

  app.bind('datasources.config.db').to({
    name: 'db',
    connector: 'memory',
  });

  await app.start();
  return app;
}