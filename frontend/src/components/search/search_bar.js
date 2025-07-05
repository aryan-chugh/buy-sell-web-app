import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const suggestions = [
    'coffee machines',
    'coffee chiffon cake',
    'coffee grinder',
    'drip coffee machine',
    'smeg coffee machine',
  ];

  return (
    <div className="search-bar-container bg-light p-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary">
          <i className="bi bi-x"></i>
        </button>
      </div>
      <div className="mt-2">
        <strong>Suggestions: </strong>
        {suggestions.map((suggestion, index) => (
          <a
            key={index}
            href={`/search?q=${suggestion}`}
            className="text-muted me-2 text-decoration-none"
          >
            {suggestion}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
