import {Count, CountSchema, repository} from '@loopback/repository';
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
import {Actors, Movies} from '../models';
import {
  ActorsRepository,
  LinksRepository,
  MovieActorRepository,
} from '../repositories';
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

interface ApiResponse {
  status: number;
  message?: string;
  actors?: Actors[] | void[];
  error?: string;
}

export class ActorsController {
  constructor(
    @repository(ActorsRepository)
    public actorsRepository: ActorsRepository,
    @repository(LinksRepository)
    public linksRepository: LinksRepository,
    @repository(MovieActorRepository)
    public movieActorRepository: MovieActorRepository,
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
  ): Promise<Actors> {
    const link = actors.actorLink;
    const actor = await this.linksRepository.create(link).then(newLink => {
      actors.link = newLink.id;
      return this.actorsRepository.create(_.omit(actors, ['actorLink']));
    });

    return this.actorsRepository.findById(actor.id, {
      include: [{relation: 'actorLink', scope: {fields: {id: false}}}],
    });
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
      include: [
        {relation: 'actorLink', scope: {fields: {id: false}}},
        {relation: 'actorMovies'},
      ],
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
      include: [
        {relation: 'actorLink', scope: {fields: {id: false}}},
        {relation: 'actorMovies'},
      ],
    });
  }

  @get('/actors/{id}/movies')
  @response(200, {
    description: 'Actors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Actors, {includeRelations: true}),
      },
    },
  })
  async findMoviesById(@param.path.string('id') id: string): Promise<Movies[]> {
    return this.actorsRepository
      .actorMovies(id)
      .find({include: [{relation: 'movieLink'}], order: ['yearReleased DESC']});
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
  ): Promise<Actors> {
    const actorLink = actors.actorLink;
    await this.actorsRepository.updateById(
      id,
      _.omit(actors, ['actorLink', 'link']),
    );
    await this.linksRepository.updateById(actors.link, actorLink);

    return this.actorsRepository.findById(id, {
      include: [{relation: 'actorLink', scope: {fields: {id: false}}}],
    });
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ADMIN']})
  @del('/actors/{id}')
  @response(204, {
    description: 'Actors DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<ApiResponse> {
    const actor = await this.actorsRepository.findById(id, {
      include: [
        {relation: 'actorLink', scope: {fields: {id: false}}},
        {relation: 'actorMovies'},
      ],
    });

    const movieCount = await this.movieActorRepository.count({actorId: id});
    if (movieCount.count > 0) {
      return {
        status: 500,
        error: `Actor have (${movieCount.count}) existing movie.`,
        actors: [actor],
      };
    } else {
      await this.actorsRepository.deleteById(id);
      await this.linksRepository.deleteById(actor.link);

      return {status: 200, message: 'Actor deleted.', actors: [actor]};
    }
  }
}
