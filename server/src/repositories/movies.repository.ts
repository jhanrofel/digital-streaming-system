import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyThroughRepositoryFactory,
  BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Movies, MoviesRelations, Links, Actors, MovieActor, Reviews} from '../models';
import {LinksRepository} from './links.repository';
import {MovieActorRepository} from './movie-actor.repository';
import {ActorsRepository} from './actors.repository';
import {ReviewsRepository} from './reviews.repository';

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

  public readonly movieReviews: HasManyRepositoryFactory<Reviews, typeof Movies.prototype.id>;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
    @repository.getter('LinksRepository')
    protected linksRepositoryGetter: Getter<LinksRepository>,
    @repository.getter('MovieActorRepository')
    protected movieActorRepositoryGetter: Getter<MovieActorRepository>,
    @repository.getter('ActorsRepository')
    protected actorsRepositoryGetter: Getter<ActorsRepository>, 
    @repository.getter('ReviewsRepository') protected reviewsRepositoryGetter: Getter<ReviewsRepository>,
  ) {
    super(Movies, dataSource);
    this.movieReviews = this.createHasManyRepositoryFactoryFor('movieReviews', reviewsRepositoryGetter,);
    this.registerInclusionResolver('movieReviews', this.movieReviews.inclusionResolver);
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
