import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import { catchError } from "../helpers";
import {
  IUserForm,
  IUserFormPatch,
  IUserInitialState,
  IUserLogin,
} from "../types";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

/**
 * Users registration
 */
export const usersRegister = createAsyncThunk(
  "users/register",
  async (formValues: IUserForm, { rejectWithValue }) => {
    return axios({
      url: `/users/register`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        return res.data.status === "success"
          ? res.data.users[0]
          : rejectWithValue(res.data.message);
      })
      .catch((error) => catchError(error));
  }
);

/**
 * Users login
 */
export const usersLogin = createAsyncThunk(
  "users/login",
  async (formValues: IUserLogin, { rejectWithValue }) => {
    return axios({
      url: `/users/login`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        return res.data.status === "success"
          ? res.data.message
          : rejectWithValue(res.data.message);
      })
      .catch((error) => catchError(error));
  }
);

/**
 * User details by id
 */
export const usersById = createAsyncThunk(
  "users/one",
  async (userId: string) => {
    return axios({
      url: `/users/${userId}`,
      method: "get",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data.users[0])
      .catch((error) => catchError(error));
  }
);

/**
 * Users current login data
 */
export const usersData = createAsyncThunk("users/me", async () => {
  return axios({
    url: `/users/me`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  })
    .then((res) => {
      return res.data.users[0];
    })
    .catch((error) => catchError(error));
});

/**
 * Get the list of users pending registration
 */
export const usersPendingRegistration = createAsyncThunk(
  "users/pending-registration",
  async () => {
    return axios({
      url: `/users`,
      method: "get",
      params: {
        filter: {
          where: { approval: "pending", email: { neq: "admin@mail.com" } },
        },
      },
      headers: {
        Authorization: authenticationToken(),
      },
    })
      .then((res) => res.data.users)
      .catch((error) => catchError(error));
  }
);

/**
 * Users registration approval
 */
export const usersRegistrationApproval = createAsyncThunk(
  "users/registration-approval",
  async (formValues: IUserFormPatch, { rejectWithValue }) => {
    return axios({
      url: `/users/${formValues.id}`,
      method: "patch",
      data: formValues,
      headers: {
        Authorization: authenticationToken(),
      },
    })
      .then((res) =>
        res.data.status === "success"
          ? formValues
          : rejectWithValue(res.data.message)
      )
      .catch((error) => catchError(error));
  }
);

/**
 * Get list of approved users
 */
export const usersApproved = createAsyncThunk("users/approved", async () => {
  return axios({
    url: `/users`,
    method: "get",
    params: {
      filter: {
        where: { approval: "approved", email: { neq: "admin@mail.com" } },
      },
    },
    headers: {
      Authorization: authenticationToken(),
    },
  })
    .then((res) => res.data.users)
    .catch((error) => catchError(error));
});

/**
 * Users update details
 */
export const usersUpdate = createAsyncThunk(
  "users/update",
  async (formValues: IUserFormPatch, { rejectWithValue }) => {
    return axios({
      url: `/users/${formValues.id}`,
      method: "patch",
      data: formValues,
      headers: {
        Authorization: authenticationToken(),
      },
    })
      .then((res) =>
        res.data.status === "success"
          ? formValues
          : rejectWithValue(res.data.message)
      )
      .catch((error) => catchError(error));
  }
);

export const usersDelete = createAsyncThunk(
  "users/delete",
  async (userId: string) => {
    return axios({
      url: `/users/${userId}`,
      method: "delete",
      headers: {
        Authorization: authenticationToken(),
      },
    })
      .then(() => userId)
      .catch((err) => {
        return err;
      });
  }
);

const initialState = {
  logged: false,
  list: [],
  byId: null,
  selected: null,
} as IUserInitialState;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.list = [];
      state.byId = null;
      state.selected = null;
    },
    selectUsers: (state, action) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.byId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(usersRegister.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
    });
    builder.addCase(usersLogin.fulfilled, (state) => {
      state.logged = true;
    });
    builder.addCase(usersPendingRegistration.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(usersRegistrationApproval.fulfilled, (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(usersApproved.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(usersDelete.fulfilled, (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    });
    builder.addCase(usersById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
    builder.addCase(usersUpdate.fulfilled, (state, action) => {
      state.list = state.list.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
      state.byId = null;
    });
  },
});

export const { clearUser, selectUsers, clearSelected } = userSlice.actions;
export default userSlice.reducer;
