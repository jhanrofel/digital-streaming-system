import {repository} from '@loopback/repository';
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
import {ReviewsRepository} from '../repositories';
import {ReviewsApprovalSchema, ReviewsPostSchema} from '../schemas';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

interface ApiResponse {
  status: number;
  message?: string;
  reviews?: Reviews[] | void[];
  error?: string;
}

export class ReviewsController {
  constructor(
    @repository(ReviewsRepository)
    public reviewsRepository: ReviewsRepository,

    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) {}

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN', 'USER']})
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
  ): Promise<ApiResponse> {
    const userId = currentUserProfile[securityId];
    const review = await this.reviewsRepository.count({
      user: userId,
      movie: reviews.movie,
    });
    if (review.count) {
      return {status: 500, error: 'You already have review on this movie.'};
    } else {
      const newReview = await this.reviewsRepository.create({...reviews, user: userId});
      return {status: 200, message: 'Your review is awaiting for approval.', reviews:[newReview]};
    }
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @patch('/reviews/{id}/approval')
  @response(204, {
    description: 'Reviews Approved',
  })
  async reviewApproval(
    @param.path.string('id') id: string,
    @requestBody({
      content: {'application/json': {schema: ReviewsApprovalSchema}},
    })
    reviews: Reviews,
  ): Promise<void> {
    await this.reviewsRepository.updateById(id, reviews);
  }

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
  async find(): Promise<Reviews[]> {
    return this.reviewsRepository.find({
      include: ['reviewUser', 'reviewMovie'],
    });
  }

  @get('/reviews/approval')
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
  async findApproval(): Promise<Reviews[]> {
    return this.reviewsRepository.find({
      where: {approval: 'pending'},
      include: ['reviewUser', 'reviewMovie'],
    });
  }

  @get('/reviews/approved')
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
  async findApproved(): Promise<Reviews[]> {
    return this.reviewsRepository.find({
      where: {approval: 'approved'},
      include: ['reviewUser', 'reviewMovie'],
    });
  }

  @get('/reviews/disapproved')
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
  async findDisapproved(): Promise<Reviews[]> {
    return this.reviewsRepository.find({
      where: {approval: 'disapproved'},
      include: ['reviewUser', 'reviewMovie'],
    });
  }

  @get('/reviews/{id}')
  @response(200, {
    description: 'Reviews model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reviews, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Reviews> {
    return this.reviewsRepository.findById(id, {
      include: ['reviewUser', 'reviewMovie'],
    });
  }

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
  ): Promise<Reviews[] | void> {
    const userId = currentUserProfile[securityId];
    return this.reviewsRepository.find({where: {user: userId, movie: id}});
  }
}
