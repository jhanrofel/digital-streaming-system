import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
import {Reviews} from './reviews.model';

@model()
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    default: 'USER',
  })
  role: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  email: string;

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
    default: 'pending',
  })
  approval: string;

  @property({
    type: 'string',
    default: 'ACTIVATED',
  })
  status: string;

  @hasOne(() => UserCredentials, {keyTo: 'userId'})
  userCredentials: UserCredentials;

  @hasMany(() => Reviews, {keyTo: 'user'})
  userReviews: Reviews[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
