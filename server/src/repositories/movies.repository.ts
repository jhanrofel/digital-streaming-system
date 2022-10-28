import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Movies, MoviesRelations, Links} from '../models';
import {LinksRepository} from './links.repository';

export class MoviesRepository extends DefaultCrudRepository<
  Movies,
  typeof Movies.prototype.id,
  MoviesRelations
> {

  public readonly movieLink: HasOneRepositoryFactory<Links, typeof Movies.prototype.id>;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource, @repository.getter('LinksRepository') protected linksRepositoryGetter: Getter<LinksRepository>,
  ) {
    super(Movies, dataSource);
    this.movieLink = this.createHasOneRepositoryFactoryFor('movieLink', linksRepositoryGetter);
    this.registerInclusionResolver('movieLink', this.movieLink.inclusionResolver);
  }
}
