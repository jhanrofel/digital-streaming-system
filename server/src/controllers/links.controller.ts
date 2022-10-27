import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Links} from '../models';
import {LinksRepository} from '../repositories';

export class LinksController {
  constructor(
    @repository(LinksRepository)
    public linksRepository : LinksRepository,
  ) {}

  @post('/links')
  @response(200, {
    description: 'Links model instance',
    content: {'application/json': {schema: getModelSchemaRef(Links)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Links, {
            title: 'NewLinks',
            exclude: ['id'],
          }),
        },
      },
    })
    links: Omit<Links, 'id'>,
  ): Promise<Links> {
    return this.linksRepository.create(links);
  }

  @get('/links/count')
  @response(200, {
    description: 'Links model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Links) where?: Where<Links>,
  ): Promise<Count> {
    return this.linksRepository.count(where);
  }

  @get('/links')
  @response(200, {
    description: 'Array of Links model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Links, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Links) filter?: Filter<Links>,
  ): Promise<Links[]> {
    return this.linksRepository.find(filter);
  }

  @patch('/links')
  @response(200, {
    description: 'Links PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Links, {partial: true}),
        },
      },
    })
    links: Links,
    @param.where(Links) where?: Where<Links>,
  ): Promise<Count> {
    return this.linksRepository.updateAll(links, where);
  }

  @get('/links/{id}')
  @response(200, {
    description: 'Links model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Links, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Links, {exclude: 'where'}) filter?: FilterExcludingWhere<Links>
  ): Promise<Links> {
    return this.linksRepository.findById(id, filter);
  }

  @patch('/links/{id}')
  @response(204, {
    description: 'Links PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Links, {partial: true}),
        },
      },
    })
    links: Links,
  ): Promise<void> {
    await this.linksRepository.updateById(id, links);
  }

  @put('/links/{id}')
  @response(204, {
    description: 'Links PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() links: Links,
  ): Promise<void> {
    await this.linksRepository.replaceById(id, links);
  }

  @del('/links/{id}')
  @response(204, {
    description: 'Links DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.linksRepository.deleteById(id);
  }
}
