import reducer, {
  moviesList,
  moviesSearch,
  moviesLatestUploads,
  moviesFeatured,
  moviesComingSoon,
  moviesById,
  moviesPost,
  moviesDelete,
  moviesReviewsApproved,
  moviesRating,
  clearMovies,
  clearSelected,
  selectMovies,
} from "../../utilities/slice/movieSlice";
import { IMovieInitialState } from "../../utilities/types";
import {
  mockMoviesList,
  mockMoviesOne,
  mockMovieDeleteId,
  mockMovieReviews,
  mockMovieRating,mockMovieIdSelected
} from "../../mocks/movies.mocks";

describe("Movies Slice ExtraReducers", () => {
  const initialState: IMovieInitialState = {
    list: [],
    byId: null,
    reviews: [],
    comingSoon: [],
    featured: [],
    selected: null,
    rating: null,
  };

  describe("get all the movies", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: moviesList.fulfilled.type,
          payload: mockMoviesList,
        })
      ).toEqual({
        list: mockMoviesList,
        byId: null,
        reviews: [],
        comingSoon: [],
        featured: [],
        selected: null,
        rating: null,
      });
    });
  });

  describe("get search movies", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: moviesSearch.fulfilled.type,
          payload: mockMoviesList,
        })
      ).toEqual({
        list: mockMoviesList,
        byId: null,
        reviews: [],
        comingSoon: [],
        featured: [],
        selected: null,
        rating: null,
      });
    });
  });

  describe("get latest movie uploads", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: moviesLatestUploads.fulfilled.type,
          payload: mockMoviesList,
        })
      ).toEqual({
        list: mockMoviesList,
        byId: null,
        reviews: [],
        comingSoon: [],
        featured: [],
        selected: null,
        rating: null,
      });
    });
  });

  describe("get featured movies", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: moviesFeatured.fulfilled.type,
          payload: mockMoviesList,
        })
      ).toEqual({
        list: [],
        byId: null,
        reviews: [],
        comingSoon: [],
        featured: mockMoviesList,
        selected: null,
        rating: null,
      });
    });
  });

  describe("get coming soon movies", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: moviesComingSoon.fulfilled.type,
          payload: mockMoviesList,
        })
      ).toEqual({
        list: [],
        byId: null,
        reviews: [],
        comingSoon: mockMoviesList,
        featured: [],
        selected: null,
        rating: null,
      });
    });
  });

  describe("get movies by id", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: moviesById.fulfilled.type,
          payload: mockMoviesOne,
        })
      ).toEqual({
        list: [],
        byId: mockMoviesOne,
        reviews: [],
        comingSoon: [],
        featured: [],
        selected: null,
        rating: null,
      });
    });
  });

  describe("get movies by id", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: moviesPost.fulfilled.type,
          payload: mockMoviesOne,
        })
      ).toEqual({
        list: [mockMoviesOne],
        byId: null,
        reviews: [],
        comingSoon: [],
        featured: [],
        selected: null,
        rating: null,
      });
    });
  });

  describe("delete movies by id", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, list: mockMoviesList },
          {
            type: moviesDelete.fulfilled.type,
            payload: mockMovieDeleteId,
          }
        )
      ).toEqual({
        list: [mockMoviesOne],
        byId: null,
        reviews: [],
        comingSoon: [],
        featured: [],
        selected: null,
        rating: null,
      });
    });
  });

  describe("get movie reviews", () => {
    it("fulfilled", () => {
      expect(
        reducer(
            initialState,
          {
            type: moviesReviewsApproved.fulfilled.type,
            payload: mockMovieReviews,
          }
        )
      ).toEqual({
        list: [],
        byId: null,
        reviews: mockMovieReviews,
        comingSoon: [],
        featured: [],
        selected: null,
        rating: null,
      });
    });
  });
  

  describe("get movie reviews", () => {
    it("fulfilled", () => {
      expect(
        reducer(
            initialState,
          {
            type: moviesRating.fulfilled.type,
            payload: mockMovieRating,
          }
        )
      ).toEqual({
        list: [],
        byId: null,
        reviews: [],
        comingSoon: [],
        featured: [],
        selected: null,
        rating: mockMovieRating,
      });
    });
  });

  describe("selected movies", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: selectMovies,
          payload: mockMoviesOne,
        })
      ).toEqual({ ...initialState, selected: mockMoviesOne });
    });
  });

  describe("clear selected", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, byId: mockMoviesOne },
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
          { ...initialState, list: mockMoviesList },
          {
            type: clearMovies,
          }
        )
      ).toEqual(initialState);
    });
  });

});
