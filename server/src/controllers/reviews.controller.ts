import {repository, Where} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  requestBody,
  response,
} from '@loopback/rest';
import {Reviews} from '../models';
import {MoviesRepository, ReviewsRepository} from '../repositories';
import {ReviewsApprovalSchema, ReviewsPostSchema} from '../schemas';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {IReviewApiResponse} from '../utilities/types';
import {catchError} from '../utilities/helpers';

export class ReviewsController {
  constructor(
    @repository(ReviewsRepository)
    public reviewsRepository: ReviewsRepository,

    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,

    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) {}

  /**
   * Review post
   * @param reviews
   * @param currentUserProfile
   * @returns Promise<IReviewApiResponse>
   */
  @authenticate('jwt')
  @authorize({allowedRoles: ['USER']})
  @post('/reviews')
  @response(200, {
    description: 'Reviews model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reviews)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {schema: ReviewsPostSchema},
      },
    })
    reviews: Omit<Reviews, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<IReviewApiResponse> {
    const userId = currentUserProfile[securityId];
    return this.reviewsRepository
      .count({
        user: userId,
        movie: reviews.movie,
      })
      .then(review => {
        return review.count > 0
          ? {
              status: 'error',
              message: 'You already have review on this movie.',
            }
          : this.reviewsRepository
              .create({
                ...reviews,
                user: userId,
              })
              .then(review => ({
                status: 'success',
                message: 'Your review is awaiting for approval.',
                reviews: [review],
              }));
      })
      .catch(error => catchError(error));
  }

  /**
   * Reviews update details
   * @param id
   * @param reviews
   */
  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @patch('/reviews/{id}')
  @response(204, {
    description: 'Reviews Approved',
  })
  async reviewApproval(
    @param.path.string('id') id: string,
    @requestBody({
      content: {'application/json': {schema: ReviewsApprovalSchema}},
    })
    reviews: Reviews,
  ): Promise<IReviewApiResponse> {
    return this.reviewsRepository
      .updateById(id, reviews)
      .then(() => ({status: 'success', message: 'Review updated'}))
      .catch(error => catchError(error));
  }

  /**
   * Get list of reviews
   * @returns
   */
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
    @param.where(Reviews)
    where?: Where<Reviews>,
  ): Promise<IReviewApiResponse> {
    return this.reviewsRepository
      .find({
        where,
        include: [{relation: 'reviewUser'}, {relation: 'reviewMovie'}],
      })
      .then(reviews => ({
        status: 'success',
        message: 'Reviews found',
        reviews,
      }))
      .catch(error => catchError(error));
  }

  /**
   * Get current user review on movie
   * @param id movieId
   * @param currentUserProfile currentUser
   * @returns Review on movie by current user
   */
  @authenticate('jwt')
  @get('/my-reviews/{id}/movies')
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
  async myReviewOnMovie(
    @param.path.string('id') id: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<IReviewApiResponse> {
    const userId = currentUserProfile[securityId];
    return this.reviewsRepository
      .find({where: {user: userId, movie: id}})
      .then(reviews => ({status: 'success', message: 'Review found', reviews}))
      .catch(error => catchError(error));
  }

  /**
   * Get list of approved reviews in movie
   * @param id movieId
   * @returns object {status, message, Reviews}
   */
  @get('/movies/{id}/reviews-approved')
  @response(200, {
    description: 'Movies model instance',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reviews, {includeRelations: true}),
        },
      },
    },
  })
  async movieReviews(
    @param.path.string('id') id: string,
  ): Promise<IReviewApiResponse> {
    return this.moviesRepository
      .movieReviews(id)
      .find({
        include: ['reviewUser'],
        where: {approval: 'approved'},
        order: ['createdAt DESC'],
      })
      .then(reviews => ({status: 'success', message: 'Review found', reviews}))
      .catch(error => catchError(error));
  }
}
