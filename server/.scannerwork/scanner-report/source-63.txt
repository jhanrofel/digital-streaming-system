import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ReviewsController} from '../../controllers';
import {Reviews} from '../../models';
import {ReviewsRepository} from '../../repositories';
import {
  givenReviews,
  givenReviewById,
  mockSelectedReview,
} from '../helper';
import {UserProfile} from '@loopback/security';

let controller: ReviewsController;

describe('Review Unit Controller', () => {
  let reviewRepo: StubbedInstanceWithSinonAccessor<ReviewsRepository>;
  let user: StubbedInstanceWithSinonAccessor<UserProfile>;

  beforeEach(resetRepositories);

  it('should return list of reviews', async () => {
    const find = reviewRepo.stubs.find;

    find.resolves(givenReviews as Reviews[]);
    expect(await controller.find()).to.eql(givenReviews);

    sinon.assert.called(find);
  });

  it('should return review by id', async () => {
    const findById = reviewRepo.stubs.findById;
    findById.resolves(givenReviewById as Reviews);
    expect(await controller.findById(mockSelectedReview.id)).to.eql(givenReviewById);

    sinon.assert.called(findById);
  });

  function resetRepositories() {
    reviewRepo = createStubInstance(ReviewsRepository);
    controller = new ReviewsController(reviewRepo, user);
  }
});
