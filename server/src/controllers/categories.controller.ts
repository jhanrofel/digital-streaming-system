import {repository} from '@loopback/repository';
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
import {Categories} from '../models';
import {CategoriesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';

interface ApiResponse {
  status: number;
  message?: string;
  categories?: Categories[] | void[];
  error?: string;
}

@authenticate('jwt')
@authorize({allowedRoles: ['ADMIN']})
export class CategoriesController {
  constructor(
    @repository(CategoriesRepository)
    public categoriesRepository: CategoriesRepository,
  ) {}

  @post('/categories')
  @response(200, {
    description: 'Categories model instance',
    content: {'application/json': {schema: getModelSchemaRef(Categories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {
            title: 'NewCategories',
            exclude: ['id'],
          }),
        },
      },
    })
    categories: Omit<Categories, 'id'>,
  ): Promise<ApiResponse> {
    return this.categoriesRepository
      .create(categories)
      .then(res => {
        return {status: 200, categories: [res]};
      })
      .catch(err => {
        if (err.code === 11000) {
          return {
            status: 500,
            error: `${err.keyValue.name} category already exist.`,
          };
        } else {
          return {status: 500, error: err.message};
        }
      });
  }

  @get('/categories')
  @response(200, {
    description: 'Array of Categories model instances',
  })
  async find(): Promise<Categories[]> {
    return this.categoriesRepository.find();
  }

  @get('/categories/{id}')
  @response(200, {
    description: 'Categories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categories, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Categories> {
    return this.categoriesRepository.findById(id);
  }

  @patch('/categories/{id}')
  @response(204, {
    description: 'Categories PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {exclude: ['id']}),
        },
      },
    })
    categories: Categories,
  ): Promise<ApiResponse> {
    return this.categoriesRepository
      .updateById(id, categories)
      .then(res => {
        return {status: 200, categories: [categories]};
      })
      .catch(err => {
        if (err.code === 11000) {
          return {
            status: 500,
            error: `${err.keyValue.name} category already exist.`,
          };
        } else {
          return {status: 500, error: err.message};
        }
      });
  }

  @del('/categories/{id}')
  @response(204, {
    description: 'Categories DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriesRepository.deleteById(id);
  }
}
