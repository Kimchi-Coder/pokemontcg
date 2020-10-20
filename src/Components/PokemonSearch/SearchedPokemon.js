import React, { useEffect, useState } from "react";
import { usePokemonCache } from "../../Hooks/usePokemonCache";
import "./SearchedPokemon.css";

export default function SearchedPokemon({ onSelect }) {
  const [cache] = usePokemonCache();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    let keys = [];
    Object.keys(cache).forEach((key) => keys.push(key));
    setSearchHistory([...keys]);
  }, [cache]);

  return (
    <div className="searched-pokemon-header">
      <div className="searched-pokemon-wrapper">
        {searchHistory.length <= 10
          ? searchHistory.map((name) => (
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
            ))
          : searchHistory.slice(-10).map((name) => (
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
            ))}
      </div>
    </div>
  );
}
