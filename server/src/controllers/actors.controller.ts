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
import {Actors} from '../models';
import {ActorsRepository} from '../repositories';

export class ActorsController {
  constructor(
    @repository(ActorsRepository)
    public actorsRepository : ActorsRepository,
  ) {}

  @post('/actors')
  @response(200, {
    description: 'Actors model instance',
    content: {'application/json': {schema: getModelSchemaRef(Actors)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {
            title: 'NewActors',
            exclude: ['id'],
          }),
        },
      },
    })
    actors: Omit<Actors, 'id'>,
  ): Promise<Actors> {
    return this.actorsRepository.create(actors);
  }

  @get('/actors/count')
  @response(200, {
    description: 'Actors model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Actors) where?: Where<Actors>,
  ): Promise<Count> {
    return this.actorsRepository.count(where);
  }

  @get('/actors')
  @response(200, {
    description: 'Array of Actors model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Actors, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Actors) filter?: Filter<Actors>,
  ): Promise<Actors[]> {
    return this.actorsRepository.find(filter);
  }

  @patch('/actors')
  @response(200, {
    description: 'Actors PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {partial: true}),
        },
      },
    })
    actors: Actors,
    @param.where(Actors) where?: Where<Actors>,
  ): Promise<Count> {
    return this.actorsRepository.updateAll(actors, where);
  }

  @get('/actors/{id}')
  @response(200, {
    description: 'Actors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Actors, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Actors, {exclude: 'where'}) filter?: FilterExcludingWhere<Actors>
  ): Promise<Actors> {
    return this.actorsRepository.findById(id, filter);
  }

  @patch('/actors/{id}')
  @response(204, {
    description: 'Actors PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {partial: true}),
        },
      },
    })
    actors: Actors,
  ): Promise<void> {
    await this.actorsRepository.updateById(id, actors);
  }

  @put('/actors/{id}')
  @response(204, {
    description: 'Actors PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() actors: Actors,
  ): Promise<void> {
    await this.actorsRepository.replaceById(id, actors);
  }

  @del('/actors/{id}')
  @response(204, {
    description: 'Actors DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.actorsRepository.deleteById(id);
  }
}
