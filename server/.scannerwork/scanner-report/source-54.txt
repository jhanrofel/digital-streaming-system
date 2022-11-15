import {SchemaObject} from '@loopback/rest';

export const ReviewsApprovalSchema: SchemaObject = {
  type: 'object',
  title: 'Post Review',
  required: ['approval'],
  properties: {
    approval: {type: 'string',enum:['approved','disapproved']},
  },
};

export const ReviewsPostSchema: SchemaObject = {
  type: 'object',
  title: 'Post Review',
  required: ['description', 'rating', 'movie'],
  properties: {
    description: {type: 'string'},
    rating: {type: 'number'},
    movie: {type: 'string'},
  },
};
