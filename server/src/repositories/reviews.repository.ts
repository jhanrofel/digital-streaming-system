import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Reviews, ReviewsRelations, Movies, Users} from '../models';
import {MoviesRepository} from './movies.repository';
import {UsersRepository} from './users.repository';

export class ReviewsRepository extends DefaultCrudRepository<
  Reviews,
  typeof Reviews.prototype.id,
  ReviewsRelations
> {

  public readonly reviewMovie: BelongsToAccessor<Movies, typeof Reviews.prototype.id>;

  public readonly reviewUser: BelongsToAccessor<Users, typeof Reviews.prototype.id>;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource, @repository.getter('MoviesRepository') protected moviesRepositoryGetter: Getter<MoviesRepository>, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Reviews, dataSource);
    this.reviewUser = this.createBelongsToAccessorFor('reviewUser', usersRepositoryGetter,);
    this.registerInclusionResolver('reviewUser', this.reviewUser.inclusionResolver);
    this.reviewMovie = this.createBelongsToAccessorFor('reviewMovie', moviesRepositoryGetter,);
    this.registerInclusionResolver('reviewMovie', this.reviewMovie.inclusionResolver);
  }
}
