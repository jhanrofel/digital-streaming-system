import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import actorReducer from "./slice/actorSlice";
import categoryReducer from "./slice/categorySlice";
import movieReducer from "./slice/movieSlice";
import reviewReducer from "./slice/reviewSlice";
// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  users: userReducer,
  actors: actorReducer,
  categories: categoryReducer,
  movies: movieReducer,
  reviews: reviewReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
