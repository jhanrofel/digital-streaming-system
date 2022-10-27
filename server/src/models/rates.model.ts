import {Entity, model, property} from '@loopback/repository';

@model()
export class Rates extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  ratingAverage?: number;

  @property({
    type: 'number',
  })
  ratingCount?: number;

  @property({
    type: 'number',
  })
  like?: number;


  constructor(data?: Partial<Rates>) {
    super(data);
  }
}

export interface RatesRelations {
  // describe navigational properties here
}

export type RatesWithRelations = Rates & RatesRelations;
