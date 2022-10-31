import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
