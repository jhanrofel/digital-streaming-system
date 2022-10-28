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
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Actors} from '../models';
import {ActorsRepository, LinksRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import _ from 'lodash';
import {postSchema} from '../schemas/actors.schema';

class ActorClass {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  link: LinkClass;
}

class LinkClass {
  banner: string;
  catalogue: string;
  picture?: string[];
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
  clip?: string[];
}

export class ActorsController {
  constructor(
    @repository(ActorsRepository)
    public actorsRepository: ActorsRepository,
    @repository(LinksRepository)
    public linksRepository: LinksRepository,
  ) {}

  // @authenticate('jwt')
  // @authorize({allowedRoles: ['ADMIN']})
  @post('/actors')
  @response(200, {
    description: 'Actors model instance',
    content: {'application/json': {schema: postSchema}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: postSchema,
        },
      },
    })
    actors: ActorClass,
  ): Promise<any> {
    const link = actors.link;
    await this.actorsRepository.create(_.omit(actors, ['link'])).then(actor => {
      this.linksRepository.create({...link, actorsId: actor.id});
    });

    return actors;
  }

  @get('/actors/count')
  @response(200, {
    description: 'Actors model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Actors) where?: Where<Actors>): Promise<Count> {
    return this.actorsRepository.count(where);
  }

  @get('/actors')
  @response(200, {
    description: 'Array of Actors model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Actors, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Actors) filter?: Filter<Actors>): Promise<Actors[]> {
    return this.actorsRepository.find(filter);
  }

  @get('/actors/{id}')
  @response(200, {
    description: 'Actors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Actors, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Actors, {exclude: 'where'})
    filter?: FilterExcludingWhere<Actors>,
  ): Promise<Actors> {
    return this.actorsRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @patch('/actors/{id}')
  @response(204, {
    description: 'Actors PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {partial: true}),
        },
      },
    })
    actors: Actors,
  ): Promise<void> {
    await this.actorsRepository.updateById(id, actors);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @del('/actors/{id}')
  @response(204, {
    description: 'Actors DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.actorsRepository.deleteById(id);
  }
}
