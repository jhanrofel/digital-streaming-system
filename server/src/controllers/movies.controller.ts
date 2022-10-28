import {Count, CountSchema, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Movies} from '../models';
import {MoviesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {patchSchema} from '../schemas/movies.schema';

export class MoviesController {
  constructor(
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
  ) {}

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @post('/movies')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movies)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movies, {
            title: 'NewMovies',
            exclude: ['id', 'postDate'],
          }),
        },
      },
    })
    movies: Omit<Movies, 'id'>,
  ): Promise<Movies> {
    return this.moviesRepository.create(movies);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @get('/movies/count')
  @response(200, {
    description: 'Movies model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(): Promise<Count> {
    return this.moviesRepository.count();
  }

  @get('/movies')
  @response(200, {
    description: 'Array of Movies model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movies, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Movies[]> {
    return this.moviesRepository.find();
  }

  @get('/movies/{id}')
  @response(200, {
    description: 'Movies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movies, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Movies> {
    return this.moviesRepository.findById(id);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @patch('/movies/{id}')
  @response(204, {
    description: 'Movies PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: patchSchema,
        },
      },
    })
    movies: Movies,
  ): Promise<void> {
    await this.moviesRepository.updateById(id, movies);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @del('/movies/{id}')
  @response(204, {
    description: 'Movies DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.moviesRepository.deleteById(id);
  }
}
