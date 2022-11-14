import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Actors, ActorsRelations, Links, Movies, MovieActor} from '../models';
import {LinksRepository} from './links.repository';
import {MovieActorRepository} from './movie-actor.repository';
import {MoviesRepository} from './movies.repository';

export class ActorsRepository extends DefaultCrudRepository<
  Actors,
  typeof Actors.prototype.id,
  ActorsRelations
> {
  // public readonly actorLink: BelongsToAccessor<
  //   Links,
  //   typeof Actors.prototype.id
  // >;

  public readonly actorMovies: HasManyThroughRepositoryFactory<Movies, typeof Movies.prototype.id,
          MovieActor,
          typeof Actors.prototype.id
        >;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
    // @repository.getter('LinksRepository') protected linksRepositoryGetter: Getter<LinksRepository>, 
    @repository.getter('MovieActorRepository') protected movieActorRepositoryGetter: Getter<MovieActorRepository>, 
    @repository.getter('MoviesRepository') protected moviesRepositoryGetter: Getter<MoviesRepository>,
  ) {
    super(Actors, dataSource);
    this.actorMovies = this.createHasManyThroughRepositoryFactoryFor('actorMovies', moviesRepositoryGetter, movieActorRepositoryGetter,);
    this.registerInclusionResolver('actorMovies', this.actorMovies.inclusionResolver);
    // this.actorLink = this.createBelongsToAccessorFor(
    //   'actorLink',
    //   linksRepositoryGetter,
    // );
    // this.registerInclusionResolver(
    //   'actorLink',
    //   this.actorLink.inclusionResolver,
    // );
  }
}
