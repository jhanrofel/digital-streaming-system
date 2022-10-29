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
Movies,
MovieActor,
Actors,
} from '../models';
import {MoviesRepository} from '../repositories';

export class MoviesActorsController {
  constructor(
    @repository(MoviesRepository) protected moviesRepository: MoviesRepository,
  ) { }

  @get('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Array of Movies has many Actors through MovieActor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Actors)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Actors>,
  ): Promise<Actors[]> {
    return this.moviesRepository.movieActors(id).find(filter);
  }

  @post('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'create a Actors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Actors)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Movies.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {
            title: 'NewActorsInMovies',
            exclude: ['id'],
          }),
        },
      },
    }) actors: Omit<Actors, 'id'>,
  ): Promise<Actors> {
    return this.moviesRepository.movieActors(id).create(actors);
  }

  @patch('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Movies.Actors PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {partial: true}),
        },
      },
    })
    actors: Partial<Actors>,
    @param.query.object('where', getWhereSchemaFor(Actors)) where?: Where<Actors>,
  ): Promise<Count> {
    return this.moviesRepository.movieActors(id).patch(actors, where);
  }

  @del('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Movies.Actors DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Actors)) where?: Where<Actors>,
  ): Promise<Count> {
    return this.moviesRepository.movieActors(id).delete(where);
  }
}
