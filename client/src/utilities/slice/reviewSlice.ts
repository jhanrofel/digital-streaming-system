import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import {
  IReviewFormPost,
  IReviewFormApprovePost,
  IReviewInitialState,
} from "../types";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const reviewsList = createAsyncThunk("reviews/list", async () => {
  return axios({
    url: `/reviews`,
    method: "get",
  })
    .then((res) => res.data)
    .catch((err) => err);
});

export const reviewsApprovalList = createAsyncThunk(
  "reviews/approval-list",
  async () => {
    return axios({
      url: `/reviews/approval`,
      method: "get",
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const reviewsApprovedList = createAsyncThunk(
  "reviews/approved-list",
  async () => {
    return axios({
      url: `/reviews/approved`,
      method: "get",
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const reviewsDisapprovedList = createAsyncThunk(
  "reviews/disapproved-list",
  async () => {
    return axios({
      url: `/reviews/disapproved`,
      method: "get",
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const myMovieReview = createAsyncThunk(
  "reviews/me-movie",
  async (movieId: string) => {
    return axios({
      url: `/my-reviews/${movieId}/movies`,
      method: "get",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data[0])
      .catch((err) => err);
  }
);

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
        if (res.data.status === 200) {
          return res.data.reviews[0];
        } else {
          console.log(res.data);
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

export const reviewsApproval = createAsyncThunk(
  "reviews",
  async (formValues: IReviewFormApprovePost) => {
    return axios({
      url: `/reviews/${formValues.id}/approval`,
      method: "patch",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then(() => formValues.id)
      .catch((err) => err);
  }
);

export const reviewsDelete = createAsyncThunk(
  "reviews/delete",
  async (categoryId: string, { rejectWithValue }) => {
    return axios({
      url: `/reviews/${categoryId}`,
      method: "delete",
      headers: { Authorization: authenticationToken() },
    })
      .then(() => categoryId)
      .catch((err) => err);
  }
);

const initialState = {
  data: [],
  dataOne: {},
} as IReviewInitialState;

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.data = [];
    },
    selectReviews: (state, action) => {
      state.dataOne = { ...state.dataOne, id: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reviewsList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(reviewsApprovalList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(reviewsApprovedList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(reviewsDisapprovedList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(reviewsPost.fulfilled, (state, action) => {
      state.dataOne = action.payload;
    });
    builder.addCase(reviewsApproval.fulfilled, (state, action) => {
      state.data = state.data.filter((review) => review.id !== action.payload);
    });
    builder.addCase(myMovieReview.fulfilled, (state, action) => {
      state.dataOne = action.payload;
    });
  },
});

export const { clearReviews, selectReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
