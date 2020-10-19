import React from "react";
import { usePokemonCache } from "../../Hooks/usePokemonCache";
import "./SearchedPokemon.css";

export default function SearchedPokemon({ onSelect }) {
  const [cache] = usePokemonCache();

  return (
    <div className="searched-pokemon-header">
      Previous Searches:
      <ul className="searched-pokemon-wrapper">
        {Object.keys(cache).map((name) => (
          <li key={name}>
            <button
              className="searched-pokemon"
              style={{ width: "100%" }}
              onClick={() => onSelect(name)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
