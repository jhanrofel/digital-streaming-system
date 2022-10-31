import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Movies} from './movies.model';
import {Users} from './users.model';

@model()
export class Reviews extends Entity {
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
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  createAt: string;

  @property({
    type: 'string',
    default: 'pending',
  })
  approval?: string;

  @belongsTo(() => Movies, {name: 'reviewMovie'})
  movie: string;

  @belongsTo(() => Users, {name: 'reviewUser'})
  user: string;

  constructor(data?: Partial<Reviews>) {
    super(data);
  }
}

export interface ReviewsRelations {
  // describe navigational properties here
}

export type ReviewsWithRelations = Reviews & ReviewsRelations;
