import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/moviesSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
