import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyThroughRepositoryFactory,
  BelongsToAccessor,
} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Movies, MoviesRelations, Links, Actors, MovieActor} from '../models';
import {LinksRepository} from './links.repository';
import {MovieActorRepository} from './movie-actor.repository';
import {ActorsRepository} from './actors.repository';

export class MoviesRepository extends DefaultCrudRepository<
  Movies,
  typeof Movies.prototype.id,
  MoviesRelations
> {
  public readonly movieLink: BelongsToAccessor<
    Links,
    typeof Movies.prototype.id
  >;

  public readonly movieActors: HasManyThroughRepositoryFactory<
    Actors,
    typeof Actors.prototype.id,
    MovieActor,
    typeof Movies.prototype.id
  >;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
    @repository.getter('LinksRepository')
    protected linksRepositoryGetter: Getter<LinksRepository>,
    @repository.getter('MovieActorRepository')
    protected movieActorRepositoryGetter: Getter<MovieActorRepository>,
    @repository.getter('ActorsRepository')
    protected actorsRepositoryGetter: Getter<ActorsRepository>,
  ) {
    super(Movies, dataSource);
    this.movieActors = this.createHasManyThroughRepositoryFactoryFor(
      'movieActors',
      actorsRepositoryGetter,
      movieActorRepositoryGetter,
    );
    this.registerInclusionResolver(
      'movieActors',
      this.movieActors.inclusionResolver,
    );
    this.movieLink = this.createBelongsToAccessorFor(
      'movieLink',
      linksRepositoryGetter,
    );
    this.registerInclusionResolver(
      'movieLink',
      this.movieLink.inclusionResolver,
    );
  }
}
