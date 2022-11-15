
import {
  ActorsRepository,
  // LinksRepository,
  MoviesRepository,
  MovieActorRepository,
} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function givenEmptyDatabase() {
  // let linkRepository: LinksRepository;
  let movieActorRepository: MovieActorRepository;
  let moviesRepository: MoviesRepository;

  const actorsRepository = new ActorsRepository(
    testdb,
    // async () => linkRepository,
    async () => movieActorRepository,
    async () => moviesRepository,
  );

//   export function givenProductData(data?: Partial<Product>) {
//     return Object.assign(
//       {
//         name: 'a-product-name',
//         slug: 'a-product-slug',
//         price: 1,
//         description: 'a-product-description',
//         available: true,
//       },
//       data,
//     );
//   }

  await actorsRepository.deleteAll();
}
