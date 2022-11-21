import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ActorsController} from '../../controllers';
import {Actors} from '../../models';
import {ActorsRepository, MovieActorRepository} from '../../repositories';
import {givenActor} from '../helper';

let controller: ActorsController;
let anActor: Actors;
let anActorWithId: Actors;
let aListOfActors: Actors[];

describe('ActorController', () => {
  let actorRepo: StubbedInstanceWithSinonAccessor<ActorsRepository>;
  let movieActorRepo: StubbedInstanceWithSinonAccessor<MovieActorRepository>;
  beforeEach(givenStubbedRepository);

  it('creates a Actor', async () => {
    const create = actorRepo.stubs.create;
    create.resolves(anActorWithId);
    const response = await controller.create(anActor);
    expect(response).to.eql(anActorWithId);
    sinon.assert.calledWith(create, anActor);
  });

  it('returns a actor details', async () => {
    const findById = actorRepo.stubs.findById;
    findById.resolves(anActorWithId);
    const response = await controller.findById('6369cfea0b3b672640686e7c');
    expect(response).to.eql(anActorWithId);
    sinon.assert.calledWith(findById, anActorWithId.id);
  });

  it('returns multiple actors if they exist', async () => {
    const find = actorRepo.stubs.find;
    find.resolves(aListOfActors);
    const response = await controller.find();
    expect(response).to.eql(aListOfActors);
    sinon.assert.called(find);
  });

  function givenStubbedRepository() {
    actorRepo = createStubInstance(ActorsRepository);

    anActor = givenActor();
    anActorWithId = givenActor({
      id: '6369cfea0b3b672640686e7c',
    });
    aListOfActors = [
      anActorWithId,
      givenActor({
        id: '6369cf9f6b314926684a432e',
        firstName: 'Dwayne',
        lastName: 'Johnson',
        gender: 'Male',
        imageLink:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg',
      }),
    ] as Actors[];
    
    controller = new ActorsController(actorRepo, movieActorRepo);
  }
});
