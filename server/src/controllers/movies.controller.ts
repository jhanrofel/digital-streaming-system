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
import {MoviesRepository, MovieActorRepository, LinksRepository} from '../repositories';
import {MoviesPatchSchema, MoviesPostSchema} from '../schemas';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import _ from 'lodash';

class MovieClass {
  title: string;
  cost: number;
  yearReleased: number;
  categories?: string[];
  hashTag?: string[];
  comingSoon: boolean;
  featured: boolean;
  link?: string;
  movieLink: LinkClass;
  actors: string[];
}

class LinkClass {
  banner: string;
  catalogue: string;
  picture?: string[];
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
  clip?: string[];
}

export class MoviesController {
  constructor(
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
    @repository(LinksRepository)
    public linksRepository: LinksRepository,
    @repository(MovieActorRepository)
    public movieActorRepository: MovieActorRepository,
  ) {}

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @post('/movies')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: MoviesPostSchema}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: MoviesPostSchema,
        },
      },
    })
    movies: MovieClass,
  ): Promise<Movies> {
    const link = await this.linksRepository.create(movies.movieLink);
    const actors = movies.actors;
    movies.link = link.id;
    const movie = await this.moviesRepository.create(_.omit(movies, ['movieLink','actors']));
    actors.map(async (actor) => {
      await this.movieActorRepository.create({movieId:movie.id,actorId:actor});
    });

    return this.moviesRepository.findById(movie.id, {
      include: [{relation: 'movieLink', scope: {fields: {id: false}}}],
    });
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
    return this.moviesRepository.find({include:['movieLink','movieActors']});
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
    return this.moviesRepository.findById(id,{include:['movieLink']});
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
          schema: MoviesPostSchema,
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
    // await this.moviesRepository.movieLink(id).delete();
  }
}
