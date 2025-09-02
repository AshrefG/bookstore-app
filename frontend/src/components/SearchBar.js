import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search books by title..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;