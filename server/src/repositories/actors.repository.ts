import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Actors, ActorsRelations} from '../models';

export class ActorsRepository extends DefaultCrudRepository<
  Actors,
  typeof Actors.prototype.id,
  ActorsRelations
> {
  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
  ) {
    super(Actors, dataSource);
  }
}
