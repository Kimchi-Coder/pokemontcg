import React from "react";
import "./PokemonCard.css";
import PokemonCardInfo from "./PokemonCardInfo";

export default function PokemonCard({
  imgURL,
  name,
  types,
  hp,
  attacks,
  id,
  pokedexNum,
}) {
  return (
    <div className="pokemon-card" id={id}>
      <img className="pokemon-img" src={imgURL} alt={name}></img>
      {/* <PokemonCardInfo
        name={name}
        types={types}
        hp={hp}
        attacks={attacks}
        id={id}
        pokedexNum={pokedexNum}
      /> */}
    </div>
  );
}
