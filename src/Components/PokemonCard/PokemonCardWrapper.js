import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePokemonCache } from "../../Hooks/usePokemonCache";
import PokemonCard from "./PokemonCard";
import "./PokemonCardWrapper.css";
import Loading from "../Loading/Loading";

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
export default function PokemonCardWrapper({ pokemonQuery, setSelected }) {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: "idle",
    pokemon: null,
    error: null,
  });
  const [cache, cacheDispatch] = usePokemonCache();
  const { status, pokemon, error } = state;

  useEffect(() => {
    if (!pokemonQuery.name) return;

    dispatch({ type: "pending" });
    if (cache[pokemonQuery.name]) {
      dispatch({ type: "resolved", payload: cache[pokemonQuery.name] });
    } else {
      fetch(`https://api.pokemontcg.io/v1/cards?name=${pokemonQuery.name}`)
        .then((result) => result.json())
        .then((data) => {
          if (data.cards.length > 0) {
            cacheDispatch({
              type: "ADD_POKEMON",
              name: pokemonQuery.name,
              payload: data,
            });
            dispatch({ type: "resolved", payload: data });
          } else
            dispatch({
              type: "rejected",
              error: `There is no pokemon named: ${pokemonQuery.name}`,
            });
        })
        .catch((err) => dispatch({ type: "rejected", error: err }));
    }
  }, [pokemonQuery, cache, cacheDispatch]);

  useEffect(() => {
    window.localStorage.setItem("cache", JSON.stringify(cache));
  }, [cache, cacheDispatch]);

  const [filteredCards, setFilteredCards] = useState(pokemon);

  useEffect(() => {
    if (!pokemon) return;
    const filterCards = (query) => {
      const { type, series } = query;

      const cardsWithType = pokemon.cards.filter((card) =>
        card.hasOwnProperty("types")
      );

      if (type & series) {
        return cardsWithType.filter(
          (card) => card.types.includes(type) & (card.series === series)
        );
      } else if (type) {
        return cardsWithType.filter((card) => card.types.includes(type));
      } else if (series) {
        return cardsWithType.filter((card) => card.series === series);
      } else {
        return pokemon.cards;
      }
    };
    setFilteredCards(filterCards(pokemonQuery));
  }, [pokemonQuery, pokemon]);

  if (status === "idle")
    return <div style={{ textAlign: "center" }}>Please search a pokemon</div>;
  if (status === "pending")
    return <div style={{ textAlign: "center" }}>Catching Pokemon...</div>;
  if (status === "rejected")
    return (
      <div role="alert" style={{ textAlign: "center" }}>
        {error}
      </div>
    );
  if (status === "resolved") {
    return (
      <>
        {filteredCards ? (
          <div style={{ textAlign: "center" }}>
            Total Cards: {filteredCards.length}{" "}
          </div>
        ) : null}
        <div className="pokemon-card-wrapper">
          {filteredCards
            ? filteredCards.map((card) => (
                <Link to={`/card/${card.setCode}/${card.number}`}>
                  <PokemonCard
                    name={card.name}
                    types={card.types}
                    hp={card.hp}
                    attacks={card.attacks}
                    imgURL={card.imageUrlHiRes}
                    pokedexNum={card.nationalPokedexNumber}
                    key={card.id}
                    id={card.id}
                    num={card.number}
                    set={card.setCode}
                    setSelected={setSelected}
                    card={card}
                  />
                </Link>
              ))
            : null}
        </div>
      </>
    );
  }
}
