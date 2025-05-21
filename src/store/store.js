import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import showsReducer from "./showsSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    shows: showsReducer,
  },
});
