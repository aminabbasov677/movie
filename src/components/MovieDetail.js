import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getShowById } from "./tvmaze";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get source page and page number from state
  const { from, page } = location.state || {};
  // Fallback: check page parameter in URL
  const searchParams = new URLSearchParams(location.search);
  const urlPage = searchParams.get("page");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getShowById(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError("Error fetching movie details: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleViewOnImdb = (imdbId) => {
    if (imdbId) {
      window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
    } else {
      alert("IMDb link not available for this item.");
    }
  };

  // Back button navigation
  const handleBack = () => {
    if (from === "/favorites") {
      navigate("/favorites");
    } else if (from === "/" && page) {
      navigate(`/?page=${page}`);
    } else if (urlPage) {
      navigate(`/?page=${urlPage}`);
    } else {
      navigate("/?page=1"); // Default to home page 1
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="no-results">Movie not found</div>;

  return (
    <div className="movie-detail-container">
      <button
        className="back-button"
        onClick={handleBack}
        aria-label="Back to previous page"
      >
        ← Back
      </button>
      <div className="movie-detail">
        <div className="movie-detail-image">
          <img
            src={movie.image?.original || "https://via.placeholder.com/300x450"}
            alt={movie.name}
          />
        </div>
        <div className="movie-detail-content">
          <h2>{movie.name}</h2>
          <p
            className="movie-summary"
            dangerouslySetInnerHTML={{
              __html: movie.summary || "No summary available.",
            }}
          />
          <div className="movie-info">
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.length > 0 ? movie.genres.join(", ") : "N/A"}
            </p>
            <p>
              <strong>Language:</strong> {movie.language || "N/A"}
            </p>
            <p>
              <strong>Runtime:</strong>{" "}
              {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
            </p>
            <p>
              <strong>Premiered:</strong> {movie.premiered || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {movie.rating?.average || "N/A"}
            </p>
            <p>
              <strong>Network:</strong> {movie.network?.name || "N/A"}
            </p>
          </div>
          {movie.externals?.imdb && (
            <button
              className="imdb-button"
              onClick={() => handleViewOnImdb(movie.externals.imdb)}
            >
              View on IMDb
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
