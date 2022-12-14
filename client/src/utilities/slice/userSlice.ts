import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken, unauthorize } from "../authentication";
import { IUserFormRegister } from "../types";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const usersRegister = createAsyncThunk(
  "users/register",
  async (formValues: IUserFormRegister, { rejectWithValue }) => {
    return axios({
      url: `/users/register`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        if (res.data.status === 200) {
          return res.data.users[0];
        } else {
          console.log(res);
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

export const usersLogin = createAsyncThunk(
  "users/login",
  async (formValues: IUserFormRegister, { rejectWithValue }) => {
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

export const usersOne = createAsyncThunk(
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

interface PatchInput {
  id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  status?: string;
}

export const usersUpdate = createAsyncThunk(
  "users/update",
  async (formValues: PatchInput, { rejectWithValue }) => {
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

interface ApproveFormValues {
  id: string | number;
  approval: string;
  role: string;
}

export const usersApprove = createAsyncThunk(
  "users/approve",
  async (formValues: ApproveFormValues) => {
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

interface UsersDataOne {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
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
      state.dataOne = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        status: "",
      };
    },
    selectUsers: (state, action) => {
      state.dataOne = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(usersRegister.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
    builder.addCase(usersLogin.fulfilled, (state) => {
      state.logged = true;
    });
    builder.addCase(usersApproval.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(usersApprove.fulfilled, (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(usersApproved.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(usersDelete.fulfilled, (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    });
    builder.addCase(usersOne.fulfilled, (state, action) => {
      state.dataOne = action.payload;
    });
    builder.addCase(usersUpdate.fulfilled, (state, action) => {
      state.data = state.data.map((user) =>
        user.id === action.payload.id
          ? { ...user, status: action.payload.status }
          : user
      );
    });
  },
});

export const { clearUser, selectUsers } = userSlice.actions;
export default userSlice.reducer;
