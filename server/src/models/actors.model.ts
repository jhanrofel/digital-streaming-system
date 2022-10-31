import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Links} from './links.model';
import {Movies} from './movies.model';
import {MovieActor} from './movie-actor.model';

@model()
export class Actors extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'date',
    required: true,
  })
  birthday: string;

  @belongsTo(() => Links, {name: 'actorLink'})
  link: string;

  @hasMany(() => Movies, {through: {model: () => MovieActor, keyFrom: 'actorId', keyTo: 'movieId'}})
  actorMovies: Movies[];

  constructor(data?: Partial<Actors>) {
    super(data);
  }
}

export interface ActorsRelations {
  // describe navigational properties here
}

export type ActorsWithRelations = Actors & ActorsRelations;
