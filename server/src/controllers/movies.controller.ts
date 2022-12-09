import {Filter, repository, Where} from '@loopback/repository';
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
import {
  ActorsRepository,
  MoviesRepository,
  MovieActorRepository,
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
import {IMovieApiResponse, IMovieForm} from '../utilities/types';
import {catchError} from '../utilities/helpers';

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
    @repository(MovieActorRepository)
    public movieActorRepository: MovieActorRepository,
    @repository(ReviewsRepository)
    public reviewsRepository: ReviewsRepository,
  ) {}

  /**
   * Movies posting
   * @param movies data
   * @returns object {status, message, movies}
   */
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
    movies: IMovieForm,
  ): Promise<IMovieApiResponse> {
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

    return {
      status: 'success',
      message: 'Movie created',
      movies: [movie],
    };
  }

  /**
   * Get movies list
   * @param where condition
   * @returns object {status, message, movies}
   */
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
    @param.filter(Movies)
    filter?: Filter<Movies>,
  ): Promise<IMovieApiResponse> {
    return this.moviesRepository
      .find(filter)
      .then(movies => ({
        status: 'success',
        message: 'Movie list',
        movies,
      }))
      .catch(error => catchError(error));
  }

  /**
   * Movie search list
   * @param filter search conditions
   * @returns object {status, message, movies}
   */
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
  ): Promise<IMovieApiResponse> {
    const pattern = new RegExp('.*' + filter.search + '.*', 'i');
    const movieListId: Array<string | undefined> = [];
    return this.actorsRepository
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
      })
      .then(movies => ({
        status: 'success',
        message: 'Movie list',
        movies: movies,
      }))
      .catch(error => catchError(error));
  }

  /**
   * Get movie
   * @param id movieId
   * @returns object {status, message, movies}
   */
  @get('/movies/{id}')
  @response(200, {
    description: 'Movies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movies, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<IMovieApiResponse> {
    return this.moviesRepository
      .findById(id, {
        include: [{relation: 'movieActors'}],
      })
      .then(movie => ({
        status: 'success',
        message: 'Movie found',
        movies: [movie],
      }))
      .catch(error => catchError(error));
  }

  /**
   * Review ratings
   * @param id movieId
   * @returns object {sum, total, average}
   */
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

  /**
   * Movie update
   * @param id movieId
   * @param movies data
   * @returns object {status, message, Movies}
   */
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
    movies: IMovieForm,
  ): Promise<IMovieApiResponse> {
    const actors = movies.movieActors;
    await this.moviesRepository.updateById(id, _.omit(movies, ['movieActors']));

    await this.movieActorRepository.deleteAll({movieId: id});
    for (const actor of actors) {
      await this.movieActorRepository.create({
        movieId: id,
        actorId: actor,
      });
    }

    return this.moviesRepository
      .findById(id, {
        include: ['movieActors'],
      })
      .then(movie => ({
        status: 'success',
        message: 'Movie updated',
        movies: [movie],
      }))
      .catch(error => catchError(error));
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @del('/movies/{id}')
  @response(204, {
    description: 'Movies DELETE success',
  })
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<IMovieApiResponse> {
    const movie = await this.moviesRepository.findById(id, {
      include: ['movieActors'],
    });

    const today = new Date();
    if (today.getFullYear() > movie.yearReleased) {
      await this.moviesRepository.movieReviews(id).delete();
      await this.movieActorRepository.deleteAll({movieId: id});
      await this.moviesRepository.deleteById(id);

      return {status: 'success', message: 'Movie deleted.', movies: [movie]};
    } else {
      return {
        status: 'error',
        message: 'Required 1 year old movie to delete.',
        movies: [movie],
      };
    }
  }
}
