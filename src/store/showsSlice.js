import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allShows: [],
  displayedShows: [],
  loading: true,
  error: null,
  searchQuery: "",
  noResults: false,
  currentPage: 1,
  showsPerPage: 10,
};

const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setAllShows: (state, action) => {
      state.allShows = action.payload;
      state.loading = false;
      state.error = null;
      state.noResults = false;
    },
    setDisplayedShows: (state, action) => {
      state.displayedShows = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setNoResults: (state, action) => {
      state.noResults = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateDisplayedShows: (state) => {
      const startIndex = (state.currentPage - 1) * state.showsPerPage;
      const endIndex = startIndex + state.showsPerPage;
      state.displayedShows = state.allShows.slice(startIndex, endIndex);
    },
  },
});

export const {
  setAllShows,
  setDisplayedShows,
  setLoading,
  setError,
  setSearchQuery,
  setNoResults,
  setCurrentPage,
  updateDisplayedShows,
} = showsSlice.actions;

export default showsSlice.reducer;
