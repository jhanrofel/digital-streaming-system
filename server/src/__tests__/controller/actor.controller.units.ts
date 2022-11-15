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
  let aChangedActor: Actors;
  let aListOfActors: Actors[];
  
  describe('ActorController', () => {
    let actorRepo: StubbedInstanceWithSinonAccessor<ActorsRepository>;
    let movieActorRepo: StubbedInstanceWithSinonAccessor<MovieActorRepository>;
    beforeEach(givenStubbedRepository);
  
    it('creates a Actor', async () => {
      const create = actorRepo.stubs.create;
      create.resolves(anActorWithId);
      const response = await controller.create(anActor);
    //   console.log(response)
      expect(response).to.eql(anActorWithId);
      sinon.assert.calledWith(create, anActor);
    });
  
    // it('returns a actor details', async () => {
    //   const findById = actorRepo.stubs.findById;
    //   findById.resolves(anActorWithId);
    //   const response = await controller.findById(anActorWithId.id);
    //   expect(response.data).to.eql(anActorWithId);
    //   sinon.assert.calledWith(findById, anActorWithId.id);
    // });
  
    // it('returns multiple actors if they exist', async () => {
    //   const find = actorRepo.stubs.find;
    //   find.resolves(aListOfActors);
    //   const response = await controller.getActors();
    //   expect(response.data).to.eql(aListOfActors);
    //   sinon.assert.called(find);
    // });
  
    // it('successfully updates existing actor', async () => {
    //   const updateById = actorRepo.stubs.updateById;
    //   updateById.resolves();
    //   await controller.updateById(anActorWithId.id, aChangedActor);
    //   sinon.assert.calledWith(updateById, anActorWithId.id, aChangedActor);
    // });
  
    it('successfully deletes existing actor', async () => {
       const deleteById = actorRepo.stubs.deleteById;
      deleteById.resolves();
      await controller.deleteById("6369cfea0b3b672640686e7c");
    });
  
    function givenStubbedRepository() {
      actorRepo = createStubInstance(ActorsRepository);
  
    //   anActor = givenActor();
      anActorWithId = givenActor({
        id: '6369cfea0b3b672640686e7c',
      });
      // aListOfActors = [
      //   anActorWithId,
      //   givenActor({
      //     id: '6369cf9f6b314926684a432e',
      //     firstName: 'Dwayne',
      //     lastName: 'Johnson',
      //     gender: 'Male',
      //     // age: 50,
      //     imageLink:
      //       'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg',
      //   }),
      // ] as Actors[];
      aChangedActor = givenActor({
        id: anActorWithId.id,
        firstName: 'Dwayne -edited',
      });
      controller = new ActorsController(actorRepo, movieActorRepo);
    }
  });