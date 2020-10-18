import React, { useReducer, useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonCardWrapper.css";

const asyncReducer = (state, action) => {
  switch (action.type) {
    case "idle": {
      return state;
    }
    case "pending": {
      return { ...state, status: "pending" };
    }
    case "resolved": {
      return {
        ...state,
        status: "resolved",
        pokemon: action.payload,
      };
    }
    case "rejected": {
      return { status: "rejected", pokemon: null, error: action.error };
    }
    default: {
      throw new Error("How did you mess this up?");
    }
  }
};

// Add other search criteria. Perhaps make obj with all criteria {pokemonName:'pikachu', pokemonType: 'electric'...}
export default function PokemonCardWrapper({ pokemonQuery }) {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: "idle",
    pokemon: null,
    error: null,
  });

  const { status, pokemon, error } = state;
  let cache = useRef({});

  useEffect(() => {
    if (!pokemonQuery.name) return;

    dispatch({ type: "pending" });
    if (cache.current[pokemonQuery.name]) {
      dispatch({ type: "resolved", payload: cache.current[pokemonQuery.name] });
    } else {
      fetch(`https://api.pokemontcg.io/v1/cards?name=${pokemonQuery.name}`)
        .then((result) => result.json())
        .then((data) => {
          dispatch({ type: "resolved", payload: data });
          cache.current[pokemonQuery.name] = data;
        })
        .catch((err) => dispatch({ type: "rejected", error: err }));
    }
  }, [pokemonQuery]);

  if (status === "idle") return "Please search a pokemon";
  if (status === "pending") return "Loading...";
  if (status === "rejected") throw error;
  if (status === "resolved") {
    return (
      <div className="pokemon-card-wrapper">
        {pokemon.cards.map((card) => (
          <PokemonCard
            name={card.name}
            types={card.types}
            hp={card.hp}
            attacks={card.attacks}
            imgURL={card.imageUrl}
            key={card.id}
            id={card.id}
          />
        ))}
      </div>
    );
  }
}
