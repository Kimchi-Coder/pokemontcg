import React, { useReducer, useEffect } from "react";
import PokemonCard from "./PokemonCard";

const asyncReducer = (state, action) => {
  switch (action.type) {
    case "idle": {
      return state;
    }
    case "pending": {
      return { ...state, status: "pending" };
    }
    case "resolved": {
      return { ...state, status: "resolved", pokemon: action.payload };
    }
    case "rejected": {
      return { ...state, status: "rejected", error: action.error };
    }
    default: {
      throw new Error("How did you mess this up?");
    }
  }
};

// Add other search criteria. Perhaps make obj with all criteria {pokemonName:'pikachu', pokemonType: 'electric'...}
export default function PokemonCardWrapper({ pokemonName }) {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: "idle",
    pokemon: null,
    error: null,
  });

  const { status, pokemon, error } = state;

  useEffect(() => {
    if (!pokemonName) return;

    dispatch({ type: "pending" });
    fetch(`https://api.pokemontcg.io/v1/cards?name=${pokemonName}`)
      .then((result) => result.json())
      .then((data) => {
        dispatch({ type: "resolved", payload: data });
      })
      .catch((err) => dispatch({ type: "rejected", error: err }));
  }, [pokemonName]);

  if (!pokemonName && status === "idle") return "Please search a pokemon";
  if (status === "pending") return "Loading...";
  if (status === "resolved") return <div>{pokemon.name}</div>;
  if (status === "rejected") return <div role="alert"> {error.message}</div>;

  return (
    <div className="pokemon-card-wrapper">
      <PokemonCard />
    </div>
  );
}
