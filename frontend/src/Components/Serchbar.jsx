import React from 'react';
import { FaUser } from 'react-icons/fa';
import '../styles/Leftmenu.css';

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="search-bar-form">
      <FaUser className="left-search-icon" />
      <input
        type="text"
        className="search-bar"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  );
}

export default SearchBar;
