import reducer, {
  actorsList,
  actorById,
  actorsPost,
  actorsDelete,
  actorsUpdate,
  actorsMovies,
  clearActor,
  clearSelected,
  selectActors,
} from "../../utilities/slice/actorSlice";
import { IActorInitialState } from "../../utilities/types";
import {
  mockActorsList,
  mockNewActor,
  mockEditedActor,
  mockActorsListAfterEdit,
  mockActorsAfterDelete,
  mockActorIdToDelete,
  mockActorIdSelected,
  mockActorsSelected,
  mockActorsMovies,
} from "../../mocks/actors.mocks";

describe("Actors Slice ExtraReducers", () => {
  const initialState: IActorInitialState = {
    loading: false,
    list: [],
    byId: null,
    movies: [],
    selected: null,
  };

  describe("get all the actors", () => {
    it("pending", () => {
      expect(
        reducer(initialState, {
          type: actorsList.pending.type,
        })
      ).toEqual({
        loading: true,
        list: [],
        byId: null,
        movies: [],
        selected: null,
      });
    });
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: actorsList.fulfilled.type,
          payload: mockActorsList,
        })
      ).toEqual({
        loading: false,
        list: mockActorsList,
        byId: null,
        movies: [],
        selected: null,
      });
    });
    it("rejected", () => {
      expect(
        reducer(initialState, {
          type: actorsList.rejected.type,
        })
      ).toEqual({
        loading: false,
        list: [],
        byId: null,
        movies: [],
        selected: null,
      });
    });
  });

  describe("get actors by id", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: actorById.fulfilled.type,
          payload: mockActorsList[0],
        })
      ).toEqual({
        loading: false,
        list: [],
        byId: mockActorsList[0],
        movies: [],
        selected: null,
      });
    });
  });

  describe("create actors", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: actorsPost.fulfilled.type,
          payload: mockNewActor,
        })
      ).toEqual({
        loading: false,
        list: [mockNewActor],
        byId: null,
        movies: [],
        selected: null,
      });
    });
  });

  describe("update actors", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, list: mockActorsList },
          {
            type: actorsUpdate.fulfilled.type,
            payload: mockEditedActor,
          }
        )
      ).toEqual({
        loading: false,
        list: mockActorsListAfterEdit,
        byId: null,
        movies: [],
        selected: null,
      });
    });
  });

  describe("delete actors", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, list: mockActorsList },
          {
            type: actorsDelete.fulfilled.type,
            payload: mockActorIdToDelete,
          }
        )
      ).toEqual({
        loading: false,
        list: mockActorsAfterDelete,
        byId: null,
        movies: [],
        selected: null,
      });
    });
  });

  describe("get movies casted by actors", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: actorsMovies.fulfilled.type,
          payload: mockActorsMovies,
        })
      ).toEqual({
        loading: false,
        list: [],
        byId: null,
        movies: mockActorsMovies,
        selected: null,
      });
    });
  });

  describe("selected actors", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: selectActors,
          payload: mockActorIdSelected,
        })
      ).toEqual({ ...initialState, selected: mockActorIdSelected });
    });
  });

  describe("clear selected", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, byId: mockActorsSelected },
          {
            type: clearSelected,
          }
        )
      ).toEqual(initialState);
    });
  });

  describe("clear states", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, list: mockActorsList },
          {
            type: clearActor,
          }
        )
      ).toEqual(initialState);
    });
  });
});
