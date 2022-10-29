import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Actors,
  Links,
} from '../models';
import {ActorsRepository} from '../repositories';

export class ActorsLinksController {
  constructor(
    @repository(ActorsRepository)
    public actorsRepository: ActorsRepository,
  ) { }

  @get('/actors/{id}/links', {
    responses: {
      '200': {
        description: 'Links belonging to Actors',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Links)},
          },
        },
      },
    },
  })
  async getLinks(
    @param.path.string('id') id: typeof Actors.prototype.id,
  ): Promise<Links> {
    return this.actorsRepository.actorLink(id);
  }
}
