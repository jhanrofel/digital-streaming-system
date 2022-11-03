import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const categoriesList = createAsyncThunk("categories/list", async () => {
  return axios({
    url: `/categories`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  })
    .then((res) => res.data)
    .catch((err) => err);
});

interface PostInput {
  name: string;
}

export const categoriesPost = createAsyncThunk(
  "categories/post",
  async (formValues: PostInput, { rejectWithValue }) => {
    return axios({
      url: `/categories`,
      method: "post",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => {
        if (res.data.status === 200) {
          return res.data.categories[0];
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

export const categoriesDelete = createAsyncThunk(
  "categories/delete",
  async (categoryId: string | undefined, { rejectWithValue }) => {
    return axios({
      url: `/categories/${categoryId}`,
      method: "delete",
      headers: { Authorization: authenticationToken() },
    })
      .then(() => categoryId)
      .catch((err) => err);
  }
);

interface CategoriesDataOne {
  id?: string;
  name: string;
}

interface CategoriesData {
  data: CategoriesDataOne[] | [];
  dataOne: CategoriesDataOne;
}

const initialState = {
  data: [],
  dataOne: {},
} as CategoriesData;

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.data = [];
    },
    selectCategories: (state, action) => {
      state.dataOne = { id: action.payload, name: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoriesList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(categoriesPost.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
    builder.addCase(categoriesDelete.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (category) => category.id !== action.payload
      );
    });
  },
});

export const { clearCategories, selectCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
