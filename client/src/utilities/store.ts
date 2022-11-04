import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userSlice";
import actorsReducer from "./slice/actorSlice";
import categoriesReducer from "./slice/categorySlice";
import moviesReducer from "./slice/movieSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    actors: actorsReducer,
    categories: categoriesReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
