import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Links} from './links.model';
import {Actors} from './actors.model';
import {MovieActor} from './movie-actor.model';
import {Reviews} from './reviews.model';

@model()
export class Movies extends Entity {
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
  title: string;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;

  @property({
    type: 'number',
    required: true,
  })
  yearReleased: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  categories?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  hashTags?: string[];

  @property({
    type: 'boolean',
  })
  comingSoon?: boolean;

  @property({
    type: 'boolean',
  })
  featured?: boolean;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @belongsTo(() => Links, {name: 'movieLink'})
  link: string;

  @hasMany(() => Actors, {through: {model: () => MovieActor, keyFrom: 'movieId', keyTo: 'actorId'}})
  movieActors: Actors[];

  @hasMany(() => Reviews, {keyTo: 'movie'})
  movieReviews: Reviews[];

  constructor(data?: Partial<Movies>) {
    super(data);
  }
}

export interface MoviesRelations {
  // describe navigational properties here
}

export type MoviesWithRelations = Movies & MoviesRelations;
