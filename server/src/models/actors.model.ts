import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'array',
    itemType: 'string',
  })
  category?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  hashTag?: string[];


  constructor(data?: Partial<Actors>) {
    super(data);
  }
}

export interface ActorsRelations {
  // describe navigational properties here
}

export type ActorsWithRelations = Actors & ActorsRelations;
