import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import { IMovieDataPost, IMovieInitialState } from "../types";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const moviesList = createAsyncThunk("movies/list", async () => {
  return axios({
    url: `/movies`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  })
    .then((res) => res.data.movies)
    .catch((err) => err);
});

export const moviesById = createAsyncThunk(
  "movies/one",
  async (movieId: string) => {
    return axios({
      url: `/movies/${movieId}`,
      method: "get",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data.movies[0])
      .catch((err) => err);
  }
);

export const moviesSearch = createAsyncThunk(
  "movies/search",
  async (search: string) => {
    return axios({
      url: `/movies/search`,
      method: "post",
      data: { search: search },
    })
      .then((res) => res.data.movies)
      .catch((err) => err);
  }
);

export const moviesLatestUploads = createAsyncThunk(
  "movies/latest-uploads",
  async () => {
    return axios({
      url: `/movies`,
      method: "get",
      params: {
        filter: {
          limit: 10,
          order: "createdAt desc",
          include: [{ relation: "movieActors" }],
        },
      },
    })
      .then((res) => res.data.movies)
      .catch((err) => err);
  }
);

export const moviesFeatured = createAsyncThunk("movies/featured", async () => {
  return axios({
    url: `/movies`,
    method: "get",
    params: {
      filter: {
        limit: 10,
        order: "createdAt desc",
        where: { featured: true },
        include: [{ relation: "movieActors" }],
      },
    },
  })
    .then((res) => res.data.movies)
    .catch((err) => err);
});

export const moviesComingSoon = createAsyncThunk(
  "movies/coming-soon",
  async () => {
    return axios({
      url: `/movies`,
      method: "get",
      params: {
        filter: {
          limit: 10,
          order: "createdAt desc",
          where: { comingSoon: true },
          include: [{ relation: "movieActors" }],
        },
      },
    })
      .then((res) => res.data.movies)
      .catch((err) => err);
  }
);

export const moviesReviewsApproved = createAsyncThunk(
  "movies/reviews-approved",
  async (movieId: string) => {
    return axios({
      url: `/movies/${movieId}/reviews-approved`,
      method: "get",
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const moviesRating = createAsyncThunk(
  "movies/rating",
  async (movieId: string) => {
    return axios({
      url: `/movies/${movieId}/rating`,
      method: "get",
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const moviesPost = createAsyncThunk(
  "movies/post",
  async (formValues: IMovieDataPost) => {
    return axios({
      url: `/movies`,
      method: "post",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data.movies[0])
      .catch((err) => err);
  }
);

export const moviesUpdate = createAsyncThunk(
  "movies/patch",
  async (formValues: IMovieDataPost) => {
    return axios({
      url: `/movies/${formValues.id}`,
      method: "patch",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data.movies[0])
      .catch((err) => err);
  }
);

export const moviesDelete = createAsyncThunk(
  "movies/delete",
  async (movieId: string, { rejectWithValue }) => {
    return axios({
      url: `/movies/${movieId}`,
      method: "delete",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => {
        if (res.data.status === "success") {
          return res.data.movies[0];
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

const initialState = {
  list: [],
  byId: null,
  reviews: [],
  comingSoon: [],
  featured: [],
  selected: null,
  rating: null,
} as IMovieInitialState;

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.list = [];
      state.byId = null;
      state.reviews = [];
      state.comingSoon = [];
      state.featured = [];
      state.selected = null;
    },
    selectMovies: (state, action) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.byId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(moviesList.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(moviesSearch.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(moviesLatestUploads.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(moviesFeatured.fulfilled, (state, action) => {
      state.featured = action.payload;
    });
    builder.addCase(moviesComingSoon.fulfilled, (state, action) => {
      state.comingSoon = action.payload;
    });
    builder.addCase(moviesById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
    builder.addCase(moviesPost.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
    });
    builder.addCase(moviesUpdate.fulfilled, (state, action) => {
      state.list = state.list.map((movie) =>
        movie.id === action.payload.id ? action.payload : movie
      );
      state.byId = null;
    });
    builder.addCase(moviesDelete.fulfilled, (state, action) => {
      state.list = state.list.filter((movie) => movie.id !== action.payload.id);
      state.selected = null;
    });
    builder.addCase(moviesReviewsApproved.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
    builder.addCase(moviesRating.fulfilled, (state, action) => {
      state.rating = action.payload;
    });
  },
});

export const { clearMovies, selectMovies, clearSelected } = moviesSlice.actions;
export default moviesSlice.reducer;
