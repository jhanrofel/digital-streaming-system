import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {MovieActor, MovieActorRelations} from '../models';

export class MovieActorRepository extends DefaultCrudRepository<
  MovieActor,
  typeof MovieActor.prototype.id,
  MovieActorRelations
> {
  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
  ) {
    super(MovieActor, dataSource);
  }
}
