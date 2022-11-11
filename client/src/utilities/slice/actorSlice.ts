import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import { IActorInitialState, IActorPostForm } from "../types";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const actorsPost = createAsyncThunk(
  "actors/post",
  async (formValues: IActorPostForm) => {
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
  async (formValues: IActorPostForm) => {
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

export const actorsDelete = createAsyncThunk(
  "actors/delete",
  async (actorId: string) => {
    return axios({
      url: `/actors/${actorId}`,
      method: "delete",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data.actors[0])
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

export const getActorById = createAsyncThunk(
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

export const actorsMovies = createAsyncThunk(
  "actors/movies",
  async (actorId: string) => {
    return axios({
      url: `/actors/${actorId}/movies`,
      method: "get",
      headers: { Authorization: authenticationToken() },
    })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

const initialState = {
  logged: false,
  data: [],
  dataOne: {},
  byId: null,
  dataMovies: [],
  selectedId: null,
} as IActorInitialState;

export const actorSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {
    clearActor: (state) => {
      state.data = [];
    },
    selectActors: (state, action) => {
      state.selectedId = action.payload.id;
    },
    clearActorOne: (state) => {
      state.byId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actorsPost.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
    builder.addCase(actorsList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getActorById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
    builder.addCase(actorsUpdate.fulfilled, (state, action) => {
      state.data = state.data.map((actor) =>
        actor.id === action.payload.id ? action.payload : actor
      );
      state.byId = null;
    });
    builder.addCase(actorsDelete.fulfilled, (state, action) => {
      state.data = state.data.filter((actor) => actor.id !== action.payload.id);
    });
    builder.addCase(actorsMovies.fulfilled, (state, action) => {
      state.dataMovies = action.payload;
    });
  },
});

export const { clearActor, selectActors, clearActorOne } = actorSlice.actions;
export default actorSlice.reducer;
