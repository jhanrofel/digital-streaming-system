import {Count, CountSchema, Filter, repository} from '@loopback/repository';
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
import {Movies, Reviews} from '../models';
import {
  MoviesRepository,
  MovieActorRepository,
  LinksRepository,
} from '../repositories';
import {
  MoviesPatchSchema,
  MoviesPostSchema,
  MoviesSearchSchema,
} from '../schemas';
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

class SearchClass {
  search: string;
}

interface ApiResponse {
  status: number;
  message?: string;
  movies?: Movies[] | void[];
  error?: string;
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
    const movie = await this.moviesRepository.create(
      _.omit(movies, ['movieLink', 'actors']),
    );

    for (const actor of actors) {
      await this.movieActorRepository.create({
        movieId: movie.id,
        actorId: actor,
      });
    }

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
    return this.moviesRepository.find({include: ['movieLink', 'movieActors']});
  }

  @post('/movies/search')
  @response(200, {
    description: 'Array of Movies model instances',
  })
  async searchMovie(
    @requestBody({
      content: {
        'application/json': {
          schema: MoviesSearchSchema,
        },
      },
    })
    filter: SearchClass,
  ): Promise<Movies[]> {
    const pattern = new RegExp('.*'+filter.search+'.*', "i");
    return this.moviesRepository.find({where: {title:{regexp:pattern}},include:['movieLink']});
  }

  @get('/movies/latest-uploads')
  @response(200, {
    description: 'Array of Movies model instances',
  })
  async latestUploads(): Promise<Movies[]> {
    return this.moviesRepository.find({order:['createdAt DESC'],limit:10,include:['movieLink']});
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
    return this.moviesRepository.findById(id, {
      include: [{relation:'movieLink'},{relation:'movieActors',scope:{include:['actorLink']}} ],
    });
  }

  @get('/movies/{id}/reviews-approved')
  @response(200, {
    description: 'Movies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movies, {includeRelations: true}),
      },
    },
  })
  async movieReviews(@param.path.string('id') id: string): Promise<Reviews[]> {
    return this.moviesRepository
      .movieReviews(id)
      .find({where:{approval:"approved"}},{include: ['reviewUser']});
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @patch('/movies/{id}')
  @response(204, {
    description: 'Movies PATCH success',
    content: {
      'application/json': {
        schema: MoviesPatchSchema,
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: MoviesPatchSchema,
        },
      },
    })
    movies: MovieClass,
  ): Promise<Movies> {
    const link = movies.movieLink;
    const actors = movies.actors;
    await this.linksRepository.updateById(movies.link, link);
    await this.moviesRepository.updateById(
      id,
      _.omit(movies, ['movieLink', 'movieActors', 'link', 'actors', 'id']),
    );

    await this.movieActorRepository.deleteAll({movieId: id});
    for (const actor of actors) {
      await this.movieActorRepository.create({
        movieId: id,
        actorId: actor,
      });
    }

    return this.moviesRepository.findById(id, {
      include: ['movieLink', 'movieActors'],
    });
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @del('/movies/{id}')
  @response(204, {
    description: 'Movies DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<ApiResponse> {
    const movie = await this.moviesRepository.findById(id, {
      include: ['movieLink', 'movieActors'],
    });

    const today = new Date();
    if (today.getFullYear() > movie.yearReleased) {
      await this.moviesRepository.deleteById(id);
      await this.linksRepository.deleteById(movie.link);
      await this.movieActorRepository.deleteAll({movieId: id});
      await this.moviesRepository.movieReviews(id).delete();

      return {status: 200, message: 'Movie deleted.', movies: [movie]};
    } else {
      return {
        status: 500,
        error: 'Required 1 year old movie to delete.',
        movies: [movie],
      };
    }
  }
}
