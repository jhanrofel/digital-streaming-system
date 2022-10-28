import {SchemaObject} from '@loopback/rest';

export const defautSchema: SchemaObject = {};

export const countSchema: SchemaObject = {
  type: 'object',
  title: 'Count moives',
  properties: {
    where: {commingSoon: 'boolean'},
  },  
};

export const patchSchema: SchemaObject = {
  type: 'object',
  title: 'Update Movie',
  required: ['cost'],
  properties: {
    cost: {type: 'number'},
  },
};