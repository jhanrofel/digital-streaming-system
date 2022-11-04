import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const moviesList = createAsyncThunk("moviess/list", async () => {
  return axios({
    url: `/movies`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  })
    .then((res) => res.data)
    .catch((err) => err);
});

export const moviesPost = createAsyncThunk(
  "movies/post",
  async (formValues: MoviesDataOne) => {
    return axios({
      url: `/movies`,
      method: "post",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const moviesDelete = createAsyncThunk(
  "movies/post",
  async (movieId: string) => {
    return axios({
      url: `/movies/${movieId}`,
      method: "delete",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

interface MoviesDataOne {
  id?: string;
  title: string;
  cost: number;
  yearReleased: number;
  comingSoon: boolean;
  featured: boolean;
  categories: string[];
  actors: string[];
  movieLink: MovieLink;
}

interface MoviesData {
  data: MoviesDataOne[] | [];
  dataOne: MoviesDataOne;
}

interface MovieLink {
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
}

const initialState = {
  data: [],
  dataOne: {},
} as MoviesData;

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearmovies: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(moviesList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(moviesPost.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
  },
});

export const { clearmovies } = moviesSlice.actions;
export default moviesSlice.reducer;