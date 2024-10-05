import { useState } from "react";
import "/src/styles/Search.css";
import { SearchProps } from "../interface";

function Search({ restaurants }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered: string[] = restaurants.filter((restaurant) =>
        restaurant.toLowerCase().includes(value.toLowerCase())
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
    <div className="search">
      <input
        type="text"
        placeholder="Search for restaurant"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
