import React, { useEffect, useState } from "react";
import { usePokemonCache } from "../../Hooks/usePokemonCache";
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
          ? searchHistory.map((name) => (
              <SearchedButton name={name} onSelect={onSelect} />
            ))
          : searchHistory
              .slice(-10)
              .map((name) => (
                <SearchedButton name={name} onSelect={onSelect} />
              ))}
      </div>
    </div>
  );
}
const SearchedButton = ({ name, onSelect }) => {
  return (
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
  );
};
