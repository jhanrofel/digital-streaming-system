import {Entity, model, property} from '@loopback/repository';

@model()
export class MovieActor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<MovieActor>) {
    super(data);
  }
}

export interface MovieActorRelations {
  // describe navigational properties here
}

export type MovieActorWithRelations = MovieActor & MovieActorRelations;
