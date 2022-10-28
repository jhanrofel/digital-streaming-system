import {SchemaObject} from '@loopback/rest';

export const defautSchema: SchemaObject = {};

export const registerSchema: SchemaObject = {
  type: 'object',
  title: 'Registration',
  required: ['firstName', 'lastName', 'email', 'password','role'],
  properties: {
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    email: {type: 'string', format: 'email'},
    password: {type: 'string'},
    role: {type: 'string',default: 'user'},
  },
};

export const loginSchema: SchemaObject = {
  type: 'object',
  title: 'Login',
  required: ['email', 'password'],
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string'},
  },
};