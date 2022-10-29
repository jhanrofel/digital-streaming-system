import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Actors,
MovieActor,
Movies,
} from '../models';
import {ActorsRepository} from '../repositories';

export class ActorsMoviesController {
  constructor(
    @repository(ActorsRepository) protected actorsRepository: ActorsRepository,
  ) { }

  @get('/actors/{id}/movies', {
    responses: {
      '200': {
        description: 'Array of Actors has many Movies through MovieActor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Movies)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Movies>,
  ): Promise<Movies[]> {
    return this.actorsRepository.actorMovies(id).find(filter);
  }

  @post('/actors/{id}/movies', {
    responses: {
      '200': {
        description: 'create a Movies model instance',
        content: {'application/json': {schema: getModelSchemaRef(Movies)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Actors.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movies, {
            title: 'NewMoviesInActors',
            exclude: ['id'],
          }),
        },
      },
    }) movies: Omit<Movies, 'id'>,
  ): Promise<Movies> {
    return this.actorsRepository.actorMovies(id).create(movies);
  }

  @patch('/actors/{id}/movies', {
    responses: {
      '200': {
        description: 'Actors.Movies PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movies, {partial: true}),
        },
      },
    })
    movies: Partial<Movies>,
    @param.query.object('where', getWhereSchemaFor(Movies)) where?: Where<Movies>,
  ): Promise<Count> {
    return this.actorsRepository.actorMovies(id).patch(movies, where);
  }

  @del('/actors/{id}/movies', {
    responses: {
      '200': {
        description: 'Actors.Movies DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Movies)) where?: Where<Movies>,
  ): Promise<Count> {
    return this.actorsRepository.actorMovies(id).delete(where);
  }
}
