import {SchemaObject} from '@loopback/rest';

export const MoviesPatchSchema: SchemaObject = {
  type: 'object',
  title: 'Update Movie',
  required: ['title', 'cost', 'yearReleased', 'imageLink', 'movieActors'],
  properties: {
    title: {type: 'string'},
    cost: {type: 'number'},
    yearReleased: {type: 'number'},
    comingSoon: {type: 'boolean', enum: [false, true]},
    featured: {type: 'boolean', enum: [false, true]},
    imageLink: {type: 'string'},
    trailerLink: {type: 'string'},
    movieActors: {type: 'array', default: []},
  },
};

export const MoviesPostSchema: SchemaObject = {
  type: 'object',
  title: 'Post Movie',
  required: ['title', 'cost', 'yearReleased', 'imageLink', 'movieActors'],
  properties: {
    title: {type: 'string'},
    cost: {type: 'number'},
    yearReleased: {type: 'number'},
    comingSoon: {type: 'boolean', enum: [false, true]},
    featured: {type: 'boolean', enum: [false, true]},
    imageLink: {type: 'string'},
    trailerLink: {type: 'string'},
    movieActors: {type: 'array', default: []},
  },
  
};

export const MoviesSearchSchema: SchemaObject = {
  type: 'object',
  title: 'Search Movie',
  required: ['search'],
  properties: {
    search: {type: 'string'},
  },
};
