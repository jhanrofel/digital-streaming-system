import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Links, LinksRelations} from '../models';

export class LinksRepository extends DefaultCrudRepository<
  Links,
  typeof Links.prototype.id,
  LinksRelations
> {
  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
  ) {
    super(Links, dataSource);
  }
}
