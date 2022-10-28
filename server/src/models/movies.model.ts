import {Entity, model, property} from '@loopback/repository';

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
  hashTag?: string[];

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
    required: true,
  })
  postDate: string;


  constructor(data?: Partial<Movies>) {
    super(data);
  }
}

export interface MoviesRelations {
  // describe navigational properties here
}

export type MoviesWithRelations = Movies & MoviesRelations;
