import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Actors,
  Links,
} from '../models';
import {ActorsRepository} from '../repositories';

export class ActorsLinksController {
  constructor(
    @repository(ActorsRepository) protected actorsRepository: ActorsRepository,
  ) { }

  @get('/actors/{id}/links', {
    responses: {
      '200': {
        description: 'Actors has one Links',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Links),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Links>,
  ): Promise<Links> {
    return this.actorsRepository.actorLink(id).get(filter);
  }

  @post('/actors/{id}/links', {
    responses: {
      '200': {
        description: 'Actors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Links)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Actors.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Links, {
            title: 'NewLinksInActors',
            exclude: ['id'],
            optional: ['actorsId']
          }),
        },
      },
    }) links: Omit<Links, 'id'>,
  ): Promise<Links> {
    return this.actorsRepository.actorLink(id).create(links);
  }

  @patch('/actors/{id}/links', {
    responses: {
      '200': {
        description: 'Actors.Links PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Links, {partial: true}),
        },
      },
    })
    links: Partial<Links>,
    @param.query.object('where', getWhereSchemaFor(Links)) where?: Where<Links>,
  ): Promise<Count> {
    return this.actorsRepository.actorLink(id).patch(links, where);
  }

  @del('/actors/{id}/links', {
    responses: {
      '200': {
        description: 'Actors.Links DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Links)) where?: Where<Links>,
  ): Promise<Count> {
    return this.actorsRepository.actorLink(id).delete(where);
  }
}
