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
import {Actors, Links} from '../models';
import {ActorsRepository, LinksRepository} from '../repositories';
import {ActorsPostSchema} from '../schemas';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import _ from 'lodash';

class ActorClass {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  actorLink: LinkClass;
  link?: string;
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

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @post('/actors')
  @response(200, {
    description: 'Actors model instance',
    content: {'application/json': {schema: ActorsPostSchema}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: ActorsPostSchema,
        },
      },
    })
    actors: ActorClass,
  ): Promise<ActorClass> {
    const link = actors.actorLink;
    await this.linksRepository.create(link).then(newLink => {
      actors.link = newLink.id;
      this.actorsRepository.create(_.omit(actors, ['actorLink']));
    });

    return actors;
  }

  @get('/actors/count')
  @response(200, {
    description: 'Actors model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(): Promise<Count> {
    return this.actorsRepository.count();
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
  async find(): Promise<Actors[]> {
    return this.actorsRepository.find({
      include: [{relation: 'actorLink', scope: {fields: {id: false}}}],
    });
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
  async findById(@param.path.string('id') id: string): Promise<Actors> {
    return this.actorsRepository.findById(id, {
      include: [{relation: 'actorLink', scope: {fields: {id: false}}}],
    });
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
        'application/json': {schema: ActorsPostSchema},
      },
    })
    actors: ActorClass,
  ): Promise<ActorClass> {
    // const actorLink = actors.actorLink;
    // await this.actorsRepository.updateById(id, _.omit(actors, ['actorLink']));
    // await this.actorsRepository.actorLink(id).patch(actorLink);

    return actors;
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @del('/actors/{id}')
  @response(204, {
    description: 'Actors DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    //add condition if not belongsTo a movie
    await this.actorsRepository.deleteById(id);
    // this.actorsRepository.actorLink(id).delete();
  }
}
