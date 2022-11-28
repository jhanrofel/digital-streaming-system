import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {MoviesController} from '../../controllers';
import {Movies} from '../../models';
import {
  MoviesRepository,
  MovieActorRepository,
  ActorsRepository,
  ReviewsRepository,
} from '../../repositories';
import {
  givenMovies,
  givenMovieById,
  givenMoviePost,
  mockSelectedMovie,
} from '../helper';

let controller: MoviesController;

describe('Movie Unit Controller', () => {
  let actorRepo: StubbedInstanceWithSinonAccessor<ActorsRepository>;
  let movieRepo: StubbedInstanceWithSinonAccessor<MoviesRepository>;
  let movieActorRepo: StubbedInstanceWithSinonAccessor<MovieActorRepository>;
  let reviewRepo: StubbedInstanceWithSinonAccessor<ReviewsRepository>;

  beforeEach(resetRepositories);

  it('should return list of movies', async () => {
    const find = movieRepo.stubs.find;

    find.resolves(givenMovies as Movies[]);
    expect(await controller.find()).to.eql(givenMovies);

    sinon.assert.called(find);
  });

  it('should return movie by id', async () => {
    const findById = movieRepo.stubs.findById;
    findById.resolves(givenMovieById as Movies);
    expect(await controller.findById(mockSelectedMovie.id)).to.eql(
      givenMovieById,
    );

    sinon.assert.called(findById);
  });

  it('should return movie posted', async () => {
    const create = movieRepo.stubs.create;
    const newMovie = givenMoviePost(mockSelectedMovie);
    create.resolves(newMovie);
    const response = await controller.create({
      ...newMovie,
      movieActors: ['actor_id_1', 'actor_id_2'],
    });
    console.log(response);
    // expect(response).to.eql({...newMovie,movieActors:["actor_id_1","actor_id_2"]});
    sinon.assert.called(create);
  });

  function resetRepositories() {
    actorRepo = createStubInstance(ActorsRepository);
    movieRepo = createStubInstance(MoviesRepository);
    movieActorRepo = createStubInstance(MovieActorRepository);
    reviewRepo = createStubInstance(ReviewsRepository);
    controller = new MoviesController(
      actorRepo,
      movieRepo,
      movieActorRepo,
      reviewRepo,
    );
  }
});
