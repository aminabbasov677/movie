import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  savedFavorites: [],
  hasSaved: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (
        !state.hasSaved &&
        !state.favorites.some((fav) => fav.id === action.payload.id)
      ) {
        state.favorites.push({ ...action.payload, saved: false });
      }
    },
    removeFromFavorites: (state, action) => {
      if (!state.hasSaved) {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== action.payload
        );
      }
    },
    saveFavorite: (state, action) => {
      if (!state.savedFavorites.some((fav) => fav.id === action.payload.id)) {
        state.savedFavorites.push(action.payload);
      }
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload.id
      );
    },
    saveAllFavorites: (state, action) => {
      const listName = action.payload;
      state.favorites.forEach((fav) => {
        if (!state.savedFavorites.some((saved) => saved.id === fav.id)) {
          state.savedFavorites.push({ ...fav, listName });
        }
      });
      state.hasSaved = true;
    },
    resetFavorites: (state) => {
      state.favorites = [];
      state.hasSaved = false;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  saveFavorite,
  saveAllFavorites,
  resetFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
