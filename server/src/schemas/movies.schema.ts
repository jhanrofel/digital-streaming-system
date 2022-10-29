import {SchemaObject} from '@loopback/rest';

export const MoviesCountSchema: SchemaObject = {
  type: 'object',
  title: 'Count moives',
  properties: {
    where: {commingSoon: 'boolean'},
  },
};

export const MoviesPatchSchema: SchemaObject = {
  type: 'object',
  title: 'Update Movie',
  required: ['cost'],
  properties: {
    cost: {type: 'number'},
    comingSoon: {type: 'boolean', enum: [true, false]},
    featured: {type: 'boolean', enum: [true, false]},
    hashTag: {type: 'array',default: []},
    categories: {type: 'array',default: []},
    movieLink: {
      type: 'object',
      required: ['banner','catalogue'],
      properties: {
        id: {type: 'string'},
        banner: {type: 'string'},
        catalogue: {type: 'string'},
        picture: {type: 'array',default: []},
        facebook: {type: 'string'},
        instagram: {type: 'string'},
        youtube: {type: 'string'},
        trailer: {type: 'string'},
        clip: {type: 'array',default: []},
      },
    },
  },
};

export const MoviesPostSchema: SchemaObject = {
  type: 'object',
  title: 'Post Movie',
  required: ['title', 'cost', 'yearReleased'],
  properties: {
    title: {type: 'string'},
    cost: {type: 'number'},
    yearReleased: {type: 'number'},
    categories: {type: 'array'},
    hashTag: {type: 'array'},
    comingSoon: {type: 'boolean', enum: [true, false]},
    featured: {type: 'boolean', enum: [true, false]},
    actors: {type: 'array'},
  },
};
