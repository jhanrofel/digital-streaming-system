import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ReviewsController} from '../../controllers';
import {Reviews} from '../../models';
import {
  MovieActorRepository,
  MoviesRepository,
  ReviewsRepository,
} from '../../repositories';
import {givenReviews, givenReviewById, mockSelectedReview} from '../helper';
import {UserProfile} from '@loopback/security';

let controller: ReviewsController;

describe('Review Unit Controller', () => {
  let reviewRepo: StubbedInstanceWithSinonAccessor<ReviewsRepository>;
  let moviewRepo: StubbedInstanceWithSinonAccessor<MoviesRepository>;
  let user: StubbedInstanceWithSinonAccessor<UserProfile>;

  beforeEach(resetRepositories);

  it('should return list of reviews', async () => {
    const find = reviewRepo.stubs.find;

    find.resolves(givenReviews as Reviews[]);
    expect(await controller.find()).to.eql(givenReviews);

    sinon.assert.called(find);
  });

  function resetRepositories() {
    reviewRepo = createStubInstance(ReviewsRepository);
    moviewRepo = createStubInstance(MoviesRepository);
    controller = new ReviewsController(reviewRepo, moviewRepo, user);
  }
});
