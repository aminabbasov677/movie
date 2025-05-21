import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function FavoritesPage() {
  const navigate = useNavigate();
  const { savedFavorites } = useSelector((state) => state.favorites);

  const handleViewOnImdb = (imdbId) => {
    if (imdbId) {
      window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
    } else {
      alert("IMDb link not available for this item.");
    }
  };

  // Group favorites by list name
  const groupedFavorites = savedFavorites.reduce((acc, fav) => {
    const listName = fav.listName || "Unnamed List";
    if (!acc[listName]) {
      acc[listName] = [];
    }
    acc[listName].push(fav);
    return acc;
  }, {});

  return (
    <div className="favorites-page-container">
      <h2>Saved Favorites</h2>
      {savedFavorites.length === 0 ? (
        <p>No favorites saved yet.</p>
      ) : (
        Object.entries(groupedFavorites).map(([listName, listFavorites]) => (
          <div key={listName} className="favorites-list-group">
            <h3 className="favorites-list-title">{listName}</h3>
            <div className="saved-favorites-list">
              {listFavorites.map((fav) => (
                <div
                  key={fav.id}
                  className="saved-favorite-item"
                  id={`favorite-${fav.id}`}
                >
                  <div
                    className="saved-favorite-image"
                    onClick={() =>
                      navigate(`/movie/${fav.id}`, {
                        state: { from: "/favorites", movieId: fav.id },
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        fav.image?.medium ||
                        "https://via.placeholder.com/150x220?text=No+Image"
                      }
                      alt={fav.name}
                    />
                  </div>
                  <div className="saved-favorite-details">
                    <h3
                      onClick={() =>
                        navigate(`/movie/${fav.id}`, {
                          state: { from: "/favorites", movieId: fav.id },
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {fav.name}
                    </h3>
                    <p>
                      Year:{" "}
                      {fav.premiered ? fav.premiered.substring(0, 4) : "N/A"}
                    </p>
                    <div className="saved-favorite-actions">
                      {fav.externals?.imdb && (
                        <button
                          className="imdb-button"
                          onClick={() => handleViewOnImdb(fav.externals.imdb)}
                        >
                          View on IMDb
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesPage;
