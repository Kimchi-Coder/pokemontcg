import React, { useEffect, useState } from "react";
import { usePokemonCache } from "../../Hooks/usePokemonCache";
import { Link } from "react-router-dom";
import "./SearchedPokemon.css";

export default function SearchedPokemon({ onSelect }) {
  const [cache] = usePokemonCache();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    setSearchHistory(Object.keys(cache));
  }, [cache]);

  return (
    <div className="searched-pokemon-header">
      <div className="searched-pokemon-wrapper">
        {searchHistory.length <= 10
          ? searchHistory.map((name, i) => (
              <SearchedButton key={name + i} name={name} onSelect={onSelect} />
            ))
          : searchHistory
              .slice(-10)
              .map((name, i) => (
                <SearchedButton
                  key={name + i}
                  name={name}
                  onSelect={onSelect}
                />
              ))}
      </div>
    </div>
  );
}
const SearchedButton = ({ name, onSelect }) => {
  return (
    <Link to="/search">
      <button
        style={{
          minWidth: `${name.length}ch`,
          maxWidth: `${name.length + 3}ch`,
          margin: "5px",
        }}
        key={name}
        className="searched-pokemon"
        onClick={() => onSelect(name)}
      >
        {name}
      </button>
    </Link>
  );
};
