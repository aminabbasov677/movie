import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  saveFavorite,
  saveAllFavorites,
} from "../store/favoritesSlice";

function FavoritesList() {
  const dispatch = useDispatch();
  const { favorites, hasSaved } = useSelector((state) => state.favorites);
  const [listName, setListName] = useState("");

  const handleSaveAll = () => {
    if (listName.trim() && favorites.length > 0) {
      dispatch(saveAllFavorites(listName));
      setListName(""); // Clear the input after saving
    }
  };

  return (
    <div className="favorites-list-container">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((fav) => (
            <div key={fav.id} className="favorites-item">
              <div className="favorite-content">
                <span>{fav.name}</span>
                <button
                  className={`remove-icon ${hasSaved ? "disabled" : ""}`}
                  onClick={() => dispatch(removeFromFavorites(fav.id))}
                  disabled={hasSaved}
                  aria-label={`Remove ${fav.name} from favorites`}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <div className="favorite-list-name">
            <input
              type="text"
              placeholder="Enter favorite list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="favorite-list-input"
              disabled={hasSaved}
            />
          </div>
          <button
            className={`save-all-button ${
              hasSaved || !listName.trim() ? "disabled" : ""
            }`}
            onClick={handleSaveAll}
            disabled={hasSaved || !listName.trim()}
            aria-label="Save all favorites"
          >
            Save All
          </button>
        </div>
      )}
    </div>
  );
}

export default FavoritesList;
