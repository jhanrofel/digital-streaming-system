import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userSlice";
import actorsReducer from "./slice/actorSlice";
import categoriesReducer from "./slice/categorySlice";
import moviesReducer from "./slice/movieSlice";
import reviewsReducer from "./slice/reviewSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    actors: actorsReducer,
    categories: categoriesReducer,
    movies: moviesReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
