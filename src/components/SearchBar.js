import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/showsSlice";

function SearchBar({ handleSearch }) {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.shows);

  const handleInputChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a show..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        aria-label="Search for shows"
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default SearchBar;
