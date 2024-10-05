import { useState } from "react";
import "/src/styles/Search.css";

const suggestions: string[] = [
  "McDonalds",
  "Dunkin Donuts",
  "KFC",
  "Starbucks",
];

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleSearchChange = (event: any) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered: string[] = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Search for restaurant"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
