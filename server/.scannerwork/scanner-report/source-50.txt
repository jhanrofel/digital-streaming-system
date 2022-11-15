import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Users, UsersRelations, UserCredentials, Reviews} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {ReviewsRepository} from './reviews.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof Users.prototype.id>;

  public readonly userReviews: HasManyRepositoryFactory<Reviews, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource, 
    @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('ReviewsRepository') protected reviewsRepositoryGetter: Getter<ReviewsRepository>,
  ) {
    super(Users, dataSource);
    this.userReviews = this.createHasManyRepositoryFactoryFor('userReviews', reviewsRepositoryGetter,);
    this.registerInclusionResolver('userReviews', this.userReviews.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  async findCredentials(
    userId: typeof Users.prototype.id,
  ): Promise<UserCredentials | undefined> {
    return this.userCredentials(userId)
      .get()
      .catch(err => {
        if (err.code === 'ENTITY_NOT_FOUND') return undefined;
        throw err;
      });
  }
}
