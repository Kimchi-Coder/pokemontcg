import React from "react";
import { usePokemonCache } from "../../Hooks/usePokemonCache";
import "./SearchedPokemon.css";

export default function SearchedPokemon({ onSelect }) {
  const [cache] = usePokemonCache();

  return (
    <div className="searched-pokemon-header">
      <div className="searched-pokemon-wrapper">
        {Object.keys(cache).map((name) => (
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
