import {SchemaObject} from '@loopback/rest';

export const defautSchema: SchemaObject = {};

export const countSchema: SchemaObject = {
  type: 'object',
  title: 'Count moives',
  properties: {
    where: {commingSoon: 'boolean'},
  },
};

export const postSchema: SchemaObject = {
  type: 'object',
  title: 'Post Movie',
  required: ['title', 'cost', 'yearReleased'],
  properties: {
    title: {type: 'string'},
    cost: {type: 'number'},
    yearReleased: {type: 'number'},
    categories: {type: 'array'},
    hashTag: {type: 'array'},
    comingSoon: {type: 'boolean',enum:[true,false]},
    featured: {type: 'boolean',enum:[true,false]},
    actors: {type: 'object',items: {}},
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
