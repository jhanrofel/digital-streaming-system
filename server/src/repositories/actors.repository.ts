import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Actors, ActorsRelations, Links} from '../models';
import {LinksRepository} from './links.repository';

export class ActorsRepository extends DefaultCrudRepository<
  Actors,
  typeof Actors.prototype.id,
  ActorsRelations
> {
  public readonly actorLink: BelongsToAccessor<
    Links,
    typeof Actors.prototype.id
  >;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
    @repository.getter('LinksRepository')
    protected linksRepositoryGetter: Getter<LinksRepository>,
  ) {
    super(Actors, dataSource);
    this.actorLink = this.createBelongsToAccessorFor(
      'actorLink',
      linksRepositoryGetter,
    );
    this.registerInclusionResolver(
      'actorLink',
      this.actorLink.inclusionResolver,
    );
  }
}
