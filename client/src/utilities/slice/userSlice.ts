import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken, unauthorize } from "../authentication";
import {
  IUserForm,
  IUserFormPatch,
  IUserFormApprovePost,
  IUserInitialState,
  IUserLogin,
} from "../types";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const usersRegister = createAsyncThunk(
  "users/register",
  async (formValues: IUserForm, { rejectWithValue }) => {
    return axios({
      url: `/users/register`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        if (res.data.status === 200) {
          return res.data.users[0];
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

export const usersLogin = createAsyncThunk(
  "users/login",
  async (formValues: IUserLogin, { rejectWithValue }) => {
    return axios({
      url: `/users/login`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        if (res.data.status === 200) {
          return res.data.message;
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => {
        return err;
      });
  }
);

export const usersById = createAsyncThunk(
  "users/one",
  async (userId: string) => {
    return axios({
      url: `/users/${userId}`,
      method: "get",
      headers: { Authorization: authenticationToken() },
    }).then((res) => {
      return res.data;
    });
  }
);

export const usersData = createAsyncThunk("users/me", async () => {
  return axios({
    url: `/users/me`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  }).then((res) => res.data);
});

export const usersApproval = createAsyncThunk("users/approval", async () => {
  return axios({
    url: `/users/approval`,
    method: "get",
    headers: {
      Authorization: authenticationToken(),
    },
  })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.data.error.name === "UnauthorizedError") unauthorize();
      return error;
    });
});

export const usersApproved = createAsyncThunk("users/approved", async () => {
  return axios({
    url: `/users/approved`,
    method: "get",
    headers: {
      Authorization: authenticationToken(),
    },
  })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.data.error.name === "UnauthorizedError") unauthorize();
      return error;
    });
});

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
      .then((res) => {
        if (res.data.status === 200) {
          return formValues;
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => {
        return err;
      });
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

export const usersApprove = createAsyncThunk(
  "users/approve",
  async (formValues: IUserFormApprovePost) => {
    return axios({
      url: `/users/register-approval`,
      method: "post",
      data: formValues,
      headers: {
        Authorization: authenticationToken(),
      },
    })
      .then(() => formValues)
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
    builder.addCase(usersApproval.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(usersApprove.fulfilled, (state, action) => {
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
      state.byId = null
    });
  },
});

export const { clearUser, selectUsers, clearSelected } = userSlice.actions;
export default userSlice.reducer;
