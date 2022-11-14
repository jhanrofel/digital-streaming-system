import {Filter, repository} from '@loopback/repository';
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
  ActorsRepository,
  MoviesRepository,
  MovieActorRepository,
  LinksRepository,
  ReviewsRepository,
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
  categories?: string[] | undefined;
  comingSoon: boolean;
  featured: boolean;
  movieLink: string;
  trailerLink: string;
  movieActors: string[];
}

interface ApiResponse {
  status: number;
  message?: string | undefined;
  movies?: Movies[] | void[];
  error?: string | undefined;
}

interface IRating {
  _id: undefined;
  count: number;
  total: number;
  average: number;
}

export class MoviesController {
  constructor(
    @repository(ActorsRepository)
    public actorsRepository: ActorsRepository,
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
    @repository(LinksRepository)
    public linksRepository: LinksRepository,
    @repository(MovieActorRepository)
    public movieActorRepository: MovieActorRepository,
    @repository(ReviewsRepository)
    public reviewsRepository: ReviewsRepository,
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
    const actors = movies.movieActors;
    const movie = await this.moviesRepository.create(
      _.omit(movies, ['movieActors']),
    );

    for (const actor of actors) {
      await this.movieActorRepository.create({
        movieId: movie.id,
        actorId: actor,
      });
    }

    return this.moviesRepository.findById(movie.id);
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
  async find(
    @param.filter(Movies) filter?: Filter<Movies>,): Promise<Movies[]> {
    return this.moviesRepository.find(filter,{include: ['movieActors']});
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
    filter: {
      search: string;
    },
  ): Promise<Movies[]> {
    const pattern = new RegExp('.*' + filter.search + '.*', 'i');
    const movieListId: Array<string | undefined> = [];
    const movies = await this.actorsRepository
      .find({
        where: {
          or: [{firstName: {regexp: pattern}}, {lastName: {regexp: pattern}}],
        },
        include: [{relation: 'actorMovies', scope: {fields: ['id']}}],
      })
      .then(res => {
        for (const actor of res) {
          if (actor.actorMovies) {
            for (const movie of actor.actorMovies) {
              movieListId.push(movie.id);
            }
          }
        }
        return movieListId;
      })
      .then(movieListIdResponse => {
        return this.moviesRepository.find({
          where: {
            or: [{title: {regexp: pattern}}, {id: {inq: movieListIdResponse}}],
          },
          include: ['movieActors'],
        });
      });

    return movies;
  }

  @get('/movies/latest-uploads')
  @response(200, {
    description: 'Array of Movies model instances',
  })
  async latestUploads(): Promise<Movies[]> {
    return this.moviesRepository.find({
      order: ['createdAt DESC'],
      limit: 10,
    });
  }

  @get('/movies/featured')
  @response(200, {
    description: 'Array of Movies model instances',
  })
  async movieFeatured(): Promise<Movies[]> {
    return this.moviesRepository.find({
      where: {featured: true},
      order: ['createdAt DESC'],
      limit: 10,
    });
  }

  @get('/movies/coming-soon')
  @response(200, {
    description: 'Array of Movies model instances',
  })
  async movieComingSoon(): Promise<Movies[]> {
    return this.moviesRepository.find({
      where: {comingSoon: true},
      order: ['createdAt DESC'],
      limit: 10,
    });
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
      include: [{relation: 'movieActors'}],
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
    return this.moviesRepository.movieReviews(id).find({
      include: ['reviewUser'],
      where: {approval: 'approved'},
      order: ['createdAt DESC'],
    });
  }

  @get('/movies/{id}/rating')
  @response(200, {
    description: 'Movies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movies, {includeRelations: true}),
      },
    },
  })
  async movieRating(@param.path.string('id') id: string): Promise<IRating> {
    const reviewCollections = // eslint-disable-next-line
      (this.reviewsRepository.dataSource.connector as any).collection(
        'Reviews',
      );

    return reviewCollections
      .aggregate([
        {
          $match: {
            $expr: {$eq: ['$movie', {$toObjectId: id}]},
            approval: 'approved',
          },
        },
        {
          $group: {
            _id: '$group',
            count: {$sum: 1},
            total: {$sum: '$rating'},
            average: {$avg: {$sum: ['$rating']}},
          },
        },
      ])
      .get();
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
    const actors = movies.movieActors;
    await this.moviesRepository.updateById(id, _.omit(movies, ['movieActors']));

    await this.movieActorRepository.deleteAll({movieId: id});
    for (const actor of actors) {
      await this.movieActorRepository.create({
        movieId: id,
        actorId: actor,
      });
    }

    return this.moviesRepository.findById(id, {
      include: ['movieActors'],
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
      include: ['movieActors'],
    });

    const today = new Date();
    if (today.getFullYear() > movie.yearReleased) {
      await this.moviesRepository.movieReviews(id).delete();
      await this.movieActorRepository.deleteAll({movieId: id});
      await this.moviesRepository.deleteById(id);

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
