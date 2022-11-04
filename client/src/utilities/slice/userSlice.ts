import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken, unauthorize } from "../authentication";
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
  async (formValues: PostInput, { rejectWithValue }) => {
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

export const usersData = createAsyncThunk("users/me", async () => {
  return axios({
    url: `/users/me`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  }).then((res) => {
    console.log(res);
    return res.data;
  });
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

interface ApproveFormValues {
  id: string | number;
  approval: string;
  role: string;
  form: string;
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
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError")
          unauthorize();
        return error;
      });
  }
);

interface UsersDataOne {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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
      };
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
      if (action.payload.form === "approval")
        state.data = state.data.filter((user) => user.id !== action.payload.id);

      if (action.payload.form === "list") {
        state.data = state.data.map((user) => 
          user.id === action.payload.id
            ? { ...user, role: action.payload.role }
            : user
        );
      }
    });
    builder.addCase(usersApproved.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
