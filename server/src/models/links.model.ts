import {Entity, model, property} from '@loopback/repository';

@model()
export class Links extends Entity {
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
  catalogue: string;

  @property({
    type: 'string',
  })
  trailer?: string;

  @property({
    type: 'string',
  })
  moviesId?: string;

  constructor(data?: Partial<Links>) {
    super(data);
  }
}

export interface LinksRelations {
  // describe navigational properties here
}

export type LinksWithRelations = Links & LinksRelations;
