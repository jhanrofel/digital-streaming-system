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
  Links,
} from '../models';
import {MoviesRepository} from '../repositories';

export class MoviesLinksController {
  constructor(
    @repository(MoviesRepository) protected moviesRepository: MoviesRepository,
  ) { }

  @get('/movies/{id}/links', {
    responses: {
      '200': {
        description: 'Movies has one Links',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Links),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Links>,
  ): Promise<Links> {
    return this.moviesRepository.movieLink(id).get(filter);
  }

  @post('/movies/{id}/links', {
    responses: {
      '200': {
        description: 'Movies model instance',
        content: {'application/json': {schema: getModelSchemaRef(Links)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Movies.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Links, {
            title: 'NewLinksInMovies',
            exclude: ['id'],
            optional: ['moviesId']
          }),
        },
      },
    }) links: Omit<Links, 'id'>,
  ): Promise<Links> {
    return this.moviesRepository.movieLink(id).create(links);
  }

  @patch('/movies/{id}/links', {
    responses: {
      '200': {
        description: 'Movies.Links PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Links, {partial: true}),
        },
      },
    })
    links: Partial<Links>,
    @param.query.object('where', getWhereSchemaFor(Links)) where?: Where<Links>,
  ): Promise<Count> {
    return this.moviesRepository.movieLink(id).patch(links, where);
  }

  @del('/movies/{id}/links', {
    responses: {
      '200': {
        description: 'Movies.Links DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Links)) where?: Where<Links>,
  ): Promise<Count> {
    return this.moviesRepository.movieLink(id).delete(where);
  }
}
