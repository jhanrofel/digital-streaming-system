import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
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

interface PostInput {
  description: string;
  rating: number | null;
  movie: string;
}

export const reviewsPost = createAsyncThunk(
  "reviews/post",
  async (formValues: PostInput, { rejectWithValue }) => {
    return axios({
      url: `/reviews`,
      method: "post",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => {
        if (res.data.status === 200) {
          return formValues;
        } else {
          console.log(res.data);
          return rejectWithValue(res.data.error);
        }
      })
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

interface ReviewsDataOne {
  id?: string;
  name: string;
}

interface ReviewsData {
  data: ReviewsDataOne[] | [];
  dataOne: ReviewsDataOne;
}

const initialState = {
  data: [],
  dataOne: {},
} as ReviewsData;

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.data = [];
    },
    selectReviews: (state, action) => {
      state.dataOne = { id: action.payload, name: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reviewsList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(reviewsPost.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
    builder.addCase(reviewsDelete.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (category) => category.id !== action.payload
      );
    });
  },
});

export const { clearReviews, selectReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
