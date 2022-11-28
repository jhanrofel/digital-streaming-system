import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ActorsController} from '../../controllers';
import {Actors} from '../../models';
import {ActorsRepository, MovieActorRepository} from '../../repositories';
import {
  givenActors,
  givenActorById,
  mockSelectedActor,
} from '../helper';

let controller: ActorsController;

describe('Actor Unit Controller', () => {
  let actorRepo: StubbedInstanceWithSinonAccessor<ActorsRepository>;
  let movieActorRepo: StubbedInstanceWithSinonAccessor<MovieActorRepository>;

  beforeEach(resetRepositories);

  it('should return list of actors', async () => {
    const find = actorRepo.stubs.find;

    find.resolves(givenActors as Actors[]);
    expect(await controller.find()).to.eql(givenActors);

    sinon.assert.called(find);
  });

  it('should return actor by id', async () => {
    const findById = actorRepo.stubs.findById;
    findById.resolves(givenActorById as Actors);
    expect(await controller.findById(mockSelectedActor.id)).to.eql(givenActorById);

    sinon.assert.called(findById);
  });

  function resetRepositories() {
    actorRepo = createStubInstance(ActorsRepository);
    movieActorRepo = createStubInstance(MovieActorRepository);
    controller = new ActorsController(actorRepo, movieActorRepo);
  }
});
