import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const moviesList = createAsyncThunk("movies/list", async () => {
  return axios({
    url: `/movies`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  })
    .then((res) => res.data)
    .catch((err) => err);
});

export const moviesOne = createAsyncThunk(
  "movies/one",
  async (movieId: string) => {
    return axios({
      url: `/movies/${movieId}`,
      method: "get",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data)
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
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const moviesLatestUploads = createAsyncThunk(
  "movies/latest-uploads",
  async () => {
    return axios({
      url: `/movies/latest-uploads`,
      method: "get",
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const moviesFeatured = createAsyncThunk("movies/featured", async () => {
  return axios({
    url: `/movies/featured`,
    method: "get",
  })
    .then((res) => res.data)
    .catch((err) => err);
});

export const moviesComingSoon = createAsyncThunk(
  "movies/coming-soon",
  async () => {
    return axios({
      url: `/movies/coming-soon`,
      method: "get",
    })
      .then((res) => res.data)
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

export const moviesUpdate = createAsyncThunk(
  "movies/patch",
  async (formValues: MoviesDataOne) => {
    return axios({
      url: `/movies/${formValues.id}`,
      method: "patch",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data)
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
        if (res.data.status === 200) {
          return res.data.movies[0];
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

interface ReviewsDataOne {
  id?: string;
  description: string;
}

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
  dataLatestUploads: MoviesDataOne[] | [];
  dataFeatured: MoviesDataOne[] | [];
  dataComingSoon: MoviesDataOne[] | [];
  dataReviews: ReviewsDataOne[] | [];
  dataOne: MoviesDataOne;
  dataGetOne: any;
  dataRating: RatingData | [];
}

interface MovieLink {
  catalogue: string;
  trailer?: string;
}

interface RatingData {
  _id: string | null;
  count: number;
  total: number;
  average: number;
}

const initialState = {
  data: [],
  dataLatestUploads: [],
  dataFeatured: [],
  dataComingSoon: [],
  dataOne: {},
  dataGetOne: [],
  dataReviews: [],
  dataRating: [],
} as MoviesData;

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.data = [];
    },
    selectMovies: (state, action) => {
      state.dataOne = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(moviesList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(moviesSearch.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(moviesLatestUploads.fulfilled, (state, action) => {
      state.dataLatestUploads = action.payload;
    });
    builder.addCase(moviesFeatured.fulfilled, (state, action) => {
      state.dataFeatured = action.payload;
    });
    builder.addCase(moviesComingSoon.fulfilled, (state, action) => {
      state.dataComingSoon = action.payload;
    });
    builder.addCase(moviesOne.fulfilled, (state, action) => {
      state.dataGetOne = action.payload;
    });
    builder.addCase(moviesPost.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
    builder.addCase(moviesDelete.fulfilled, (state, action) => {
      state.data = state.data.filter((movie) => movie.id !== action.payload.id);
    });
    builder.addCase(moviesReviewsApproved.fulfilled, (state, action) => {
      state.dataReviews = action.payload;
    });
    builder.addCase(moviesRating.fulfilled, (state, action) => {
      state.dataRating = action.payload;
    });
  },
});

export const { clearMovies, selectMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
