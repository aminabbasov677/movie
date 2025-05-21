import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShows, searchShows } from "./components/tvmaze";
import MovieList from "./components/MovieList";
import FavoritesList from "./components/FavoritesList";
import SearchBar from "./components/SearchBar";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import FavoritesPage from "./components/FavoritesPage";
import MovieDetail from "./components/MovieDetail";
import {
  setAllShows,
  setLoading,
  setError,
  setSearchQuery,
  setNoResults,
  setCurrentPage,
  updateDisplayedShows,
} from "./store/showsSlice";
import {
  addToFavorites,
  removeFromFavorites,
  saveFavorite,
  saveAllFavorites,
} from "./store/favoritesSlice";

function MainContent() {
  const dispatch = useDispatch();
  const {
    allShows,
    displayedShows,
    loading,
    error,
    searchQuery,
    noResults,
    currentPage,
    showsPerPage,
  } = useSelector((state) => state.shows);
  const { favorites, savedFavorites, hasSaved } = useSelector(
    (state) => state.favorites
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isMovieDetailPage = location.pathname.startsWith("/movie/");

  useEffect(() => {
    fetchInitialShows();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(setSearchQuery(""));
      dispatch(setNoResults(false));
      if (!searchParams.get("page")) {
        setSearchParams({ page: "1" });
      }
      fetchInitialShows();
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(updateDisplayedShows());
  }, [allShows, currentPage]);

  const fetchInitialShows = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getShows();
      dispatch(setAllShows(data));
      if (!searchParams.get("page")) {
        setSearchParams({ page: "1" });
      }
    } catch (err) {
      dispatch(setError("Error fetching shows: " + err.message));
    }
  };

  const handleSearch = async (query) => {
    try {
      dispatch(setLoading(true));
      if (query.trim()) {
        const data = await searchShows(query);
        dispatch(setAllShows(data));
        dispatch(setNoResults(data.length === 0));
      } else {
        const data = await getShows();
        dispatch(setAllShows(data));
        dispatch(setNoResults(false));
      }
      setSearchParams({ page: "1" });
    } catch (err) {
      dispatch(setError("Error searching shows: " + err.message));
      dispatch(setNoResults(false));
    }
  };

  const handleAddToFavorites = (show) => {
    dispatch(addToFavorites(show));
  };

  const handleRemoveFromFavorites = (showId) => {
    dispatch(removeFromFavorites(showId));
  };

  const handleSaveFavorite = (show) => {
    dispatch(saveFavorite(show));
  };

  const handleSaveAll = (listName) => {
    dispatch(saveAllFavorites(listName));
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    } else {
      fetchInitialShows();
    }
  };

  const isShowFavorited = (showId) => {
    if (hasSaved) {
      return true;
    }
    return favorites.some((fav) => fav.id === showId);
  };

  const totalPages = Math.ceil(allShows.length / showsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: (currentPage + 1).toString() });
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: (currentPage - 1).toString() });
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app-container">
      {!isMovieDetailPage && (
        <header className="app-header">
          <h1>MOVIES</h1>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={(query) => dispatch(setSearchQuery(query))}
            handleSearch={handleSearch}
          />
          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Favorites Page
            </NavLink>
          </nav>
        </header>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-content">
              <div className="movie-list-container" id="movie-list">
                {noResults ? (
                  <div className="no-results">No results found</div>
                ) : (
                  <>
                    <MovieList
                      shows={displayedShows}
                      addToFavorites={handleAddToFavorites}
                      isShowFavorited={isShowFavorited}
                      currentPage={currentPage}
                    />
                    {allShows.length > 0 && (
                      <div className="pagination-container">
                        <button
                          className="pagination-button"
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                        <span className="page-indicator">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          className="pagination-button"
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="favorites-list-container">
                <FavoritesList
                  favorites={favorites}
                  removeFromFavorites={handleRemoveFromFavorites}
                  saveFavorite={handleSaveFavorite}
                  onSaveAll={handleSaveAll}
                  hasSaved={hasSaved}
                />
              </div>
            </div>
          }
        />
        <Route
          path="/favorites"
          element={<FavoritesPage favorites={savedFavorites} />}
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default MainContent;
