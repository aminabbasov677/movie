import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../store/favoritesSlice";

function MovieItem({ show, currentPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites, hasSaved } = useSelector((state) => state.favorites);

  const isFavorited = hasSaved || favorites.some((fav) => fav.id === show.id);

  return (
    <div className="movie-item">
      <div
        className="movie-image"
        onClick={() =>
          navigate(`/movie/${show.id}`, {
            state: { from: "/", page: currentPage },
          })
        }
        style={{ cursor: "pointer" }}
      >
        <img
          src={
            show.image?.medium ||
            "https://via.placeholder.com/210x295?text=No+Image"
          }
          alt={show.name}
        />
      </div>
      <div className="movie-details">
        <h3
          onClick={() =>
            navigate(`/movie/${show.id}`, {
              state: { from: "/", page: currentPage },
            })
          }
          style={{ cursor: "pointer" }}
        >
          {show.name}
        </h3>
        <p className="movie-year">
          Year: {show.premiered ? show.premiered.substring(0, 4) : "N/A"}
        </p>
        <button
          className={`favorite-button ${isFavorited ? "disabled" : ""}`}
          onClick={() => dispatch(addToFavorites(show))}
          disabled={isFavorited}
        >
          {isFavorited ? "Favorited" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MovieItem;
