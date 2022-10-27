import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Reviews} from '../models';
import {ReviewsRepository} from '../repositories';

export class ReviewsController {
  constructor(
    @repository(ReviewsRepository)
    public reviewsRepository : ReviewsRepository,
  ) {}

  @post('/reviews')
  @response(200, {
    description: 'Reviews model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reviews)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {
            title: 'NewReviews',
            exclude: ['id'],
          }),
        },
      },
    })
    reviews: Omit<Reviews, 'id'>,
  ): Promise<Reviews> {
    return this.reviewsRepository.create(reviews);
  }

  @get('/reviews/count')
  @response(200, {
    description: 'Reviews model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reviews) where?: Where<Reviews>,
  ): Promise<Count> {
    return this.reviewsRepository.count(where);
  }

  @get('/reviews')
  @response(200, {
    description: 'Array of Reviews model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reviews, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reviews) filter?: Filter<Reviews>,
  ): Promise<Reviews[]> {
    return this.reviewsRepository.find(filter);
  }

  @patch('/reviews')
  @response(200, {
    description: 'Reviews PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {partial: true}),
        },
      },
    })
    reviews: Reviews,
    @param.where(Reviews) where?: Where<Reviews>,
  ): Promise<Count> {
    return this.reviewsRepository.updateAll(reviews, where);
  }

  @get('/reviews/{id}')
  @response(200, {
    description: 'Reviews model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reviews, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reviews, {exclude: 'where'}) filter?: FilterExcludingWhere<Reviews>
  ): Promise<Reviews> {
    return this.reviewsRepository.findById(id, filter);
  }

  @patch('/reviews/{id}')
  @response(204, {
    description: 'Reviews PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {partial: true}),
        },
      },
    })
    reviews: Reviews,
  ): Promise<void> {
    await this.reviewsRepository.updateById(id, reviews);
  }

  @put('/reviews/{id}')
  @response(204, {
    description: 'Reviews PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reviews: Reviews,
  ): Promise<void> {
    await this.reviewsRepository.replaceById(id, reviews);
  }

  @del('/reviews/{id}')
  @response(204, {
    description: 'Reviews DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reviewsRepository.deleteById(id);
  }
}
