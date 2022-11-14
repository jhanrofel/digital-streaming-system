import {juggler} from '@loopback/repository';
import {Actors} from '../models';

export function giveActorPost() {  
  const data = Object.assign({
    id: '63694bfe8a9ea1faf597feb7',
    firstName: 'Robert',
    lastName: 'Downey Jr.',
    gender: 'Male',
    birthday: '01-01-1980',
    imageLink: "image_url",
  });
  return new Actors(data);
}

export function givenActor(actor?: Partial<Actors>) {
  const data = Object.assign(
    {
      id: '63694bfe8a9ea1faf597feb7',
      firstName: 'Robert',
      lastName: 'Downey Jr.',
      gender: 'Male',
      birthday: '01-01-1980',
      actorLink: '63694bfe8a9ea1faf597feb6',
    },
    {
      id: '63694c308a9ea1faf597feb9',
      firstName: 'Gwyneth',
      lastName: 'Paltrow',
      gender: 'Female',
      birthday: '02-02-1983',
      actorLink: '63694c308a9ea1faf597feb8',
    },
    actor,
  );
  return new Actors(data);
}

export const testdb: juggler.DataSource = new juggler.DataSource({
  name: 'db',
  connector: 'memory',
});
