import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationToken, unauthorize } from "../authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

interface ActorDataOne {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  actorLink : ActorLink
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
  },
});

export const { clearactor } = actorSlice.actions;
export default actorSlice.reducer;
