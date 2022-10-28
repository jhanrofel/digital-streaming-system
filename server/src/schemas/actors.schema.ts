import {SchemaObject} from '@loopback/rest';

export const defautSchema: SchemaObject = {};

export const postSchema: SchemaObject = {
  type: 'object',
  title: 'Post Actor',
  required: ['firstName', 'lastName', 'gender' ,'birthday'],
  properties: {
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    gender: {type: 'string'},
    birthday: {type: 'string'},
    link: {type: 'object'},
  },
};
