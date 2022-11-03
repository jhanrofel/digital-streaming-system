import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

interface ActorDataOne {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  link?: string;
  actorLink: ActorLink;
}

interface ActorLink {
  banner: string;
  catalogue: string;
  pictures?: string[];
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
  clips?: string[];
}

export const actorsPost = createAsyncThunk(
  "actors/post",
  async (formValues: ActorDataOne) => {
    return axios({
      url: `/actors`,
      method: "post",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const actorsUpdate = createAsyncThunk(
  "actors/update",
  async (formValues: ActorDataOne) => {
    return axios({
      url: `/actors/${formValues.id}`,
      method: "patch",
      data: formValues,
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const actorsList = createAsyncThunk("actors/list", async () => {
  return axios({
    url: `/actors`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  })
    .then((res) => res.data)
    .catch((err) => err);
});

export const actorsOne = createAsyncThunk(
  "actors/one",
  async (actorId: string) => {
    return axios({
      url: `/actors/${actorId}`,
      method: "get",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

interface ActorData {
  logged: boolean;
  data: ActorDataOne[] | [];
  dataOne: ActorDataOne;
}

const initialState = {
  logged: false,
  data: [],
  dataOne: {},
} as ActorData;

export const actorSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {
    clearactor: (state) => {
      state.logged = false;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actorsList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(actorsOne.fulfilled, (state, action) => {
      state.dataOne = action.payload;
    });
    builder.addCase(actorsUpdate.fulfilled, (state, action) => {
      state.dataOne = action.payload;
    });
  },
});

export const { clearactor } = actorSlice.actions;
export default actorSlice.reducer;
