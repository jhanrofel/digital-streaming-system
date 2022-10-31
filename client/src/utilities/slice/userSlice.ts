import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

interface PostInput {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export const usersRegister = createAsyncThunk(
  "users/register",
  async (formValues: PostInput, { rejectWithValue }) => {
    return await axios({
      url: `/users/register`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        if (res.data.status === 200) {
          return res.data;
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

export const usersLogin = createAsyncThunk(
  "users/login",
  async (formValues: PostInput, { rejectWithValue }) => {
    return await axios({
      url: `/users/login`,
      method: "post",
      data: formValues,
    })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue(err.response.data.error.message);
      });
  }
);

interface UsersDataOne {
  id: string;
  fullname: string;
  email: string;
}

interface UsersData {
  logged: boolean;
  data: UsersDataOne[] | [];
  dataOne: UsersDataOne;
}

const initialState = {
  logged: false,
  data: [],
  dataOne: {},
} as UsersData;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.logged = false;
      state.data = [];
      state.dataOne = { id: "", fullname: "", email: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(usersRegister.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
