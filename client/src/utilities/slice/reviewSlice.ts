import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import {
  IReviewFormPost,
  IReviewFormApprovePost,
  IReviewInitialState,
} from "../types";
import axios from "axios";
import { catchError } from "../helpers";
axios.defaults.baseURL = "http://localhost:3001";

/**
 * Reviews list of pending for approval
 */
export const reviewsPending = createAsyncThunk("reviews/pending", async () => {
  return axios({
    url: `/reviews`,
    method: "get",
    params: {
      where: { approval: "pending" },
    },
    headers: {
      Authorization: authenticationToken(),
    },
  })
    .then((res) => res.data.reviews)
    .catch((error) => catchError(error));
});

/**
 * Reviews approved list
 */
export const reviewsApproved = createAsyncThunk(
  "reviews/approved",
  async () => {
    return axios({
      url: `/reviews`,
      method: "get",
      params: {
        where: { approval: "approved" },
      },
    })
      .then((res) => res.data.reviews)
      .catch((error) => catchError(error));
  }
);

/**
 * Reviews disapproved list
 */
export const reviewsDisapproved = createAsyncThunk(
  "reviews/disapproved",
  async () => {
    return axios({
      url: `/reviews`,
      method: "get",
      params: {
        where: { approval: "disapproved" },
      },
    })
      .then((res) => res.data.reviews)
      .catch((error) => catchError(error));
  }
);

/**
 * Reviews post
 */
export const reviewsPost = createAsyncThunk(
  "reviews/post",
  async (formValues: IReviewFormPost, { rejectWithValue }) => {
    return axios({
      url: `/reviews`,
      method: "post",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => {
        if (res.data.status === "success") {
          return res.data.reviews[0];
        } else {
          console.log(res.data);
          return rejectWithValue(res.data.message);
        }
      })
      .catch((err) => err);
  }
);

/**
 * Reviews update details
 */
export const reviewsApproval = createAsyncThunk(
  "reviews",
  async (formValues: IReviewFormApprovePost) => {
    return axios({
      url: `/reviews/${formValues.id}`,
      method: "patch",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then(() => formValues.id)
      .catch((error) => catchError(error));
  }
);

/**
 * Reviews of current user for a movie
 */
export const myMovieReview = createAsyncThunk(
  "reviews/me-movie",
  async (movieId: string) => {
    return axios({
      url: `/my-reviews/${movieId}/movies`,
      method: "get",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data.reviews[0])
      .catch((err) => err);
  }
);

const initialState = {
  list: [],
  byId: null,
} as IReviewInitialState;

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reviewsPending.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(reviewsApproved.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(reviewsDisapproved.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(reviewsPost.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
    builder.addCase(reviewsApproval.fulfilled, (state, action) => {
      state.list = state.list.filter((review) => review.id !== action.payload);
    });
    builder.addCase(myMovieReview.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
