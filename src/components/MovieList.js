import React from "react";
import MovieItem from "./MovieItem";

function MovieList({ shows, currentPage }) {
  return (
    <div className="movie-list">
      {shows.map((show) => (
        <MovieItem key={show.id} show={show} currentPage={currentPage} />
      ))}
    </div>
  );
}

export default MovieList;
