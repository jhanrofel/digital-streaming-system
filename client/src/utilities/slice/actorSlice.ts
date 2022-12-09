import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken } from "../authentication";
import { IActorInitialState, IActorForm } from "../types";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const actorsPost = createAsyncThunk(
  "actors/post",
  async (formValues: IActorForm) => {
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
  async (formValues: IActorForm) => {
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

export const actorById = createAsyncThunk(
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
  loading: false,
  list: [],
  byId: null,
  movies: [],
  selected: null,
} as IActorInitialState;

export const actorSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {
    clearActor: (state) => {
      state.list = [];
      state.byId = null;
      state.movies = [];
      state.selected = null;
    },
    selectActors: (state, action) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.byId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actorsPost.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
    });
    builder.addCase(actorsList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actorsList.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(actorsList.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(actorById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
    builder.addCase(actorsUpdate.fulfilled, (state, action) => {
      state.list = state.list.map((actor) =>
        actor.id === action.payload.id ? action.payload : actor
      );
      state.byId = null;
    });
    builder.addCase(actorsDelete.fulfilled, (state, action) => {
      state.list = state.list.filter((actor) => actor.id !== action.payload.id);
    });
    builder.addCase(actorsMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const { clearActor, clearSelected, selectActors } = actorSlice.actions;
export default actorSlice.reducer;
