import React from "react";
import { usePokemonCache } from "../../Hooks/usePokemonCache";

export default function SearchedPokemon({ onSelect }) {
  const [cache] = usePokemonCache();

  return (
    <div>
      Previous Searches:
      <ul>
        {Object.keys(cache).map((name) => (
          <li key={name} style={{ margin: "4px auto" }}>
            <button style={{ width: "100%" }} onClick={() => onSelect(name)}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
