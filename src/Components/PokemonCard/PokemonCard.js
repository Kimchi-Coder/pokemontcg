import React from "react";
import "./PokemonCard.css";

export default function PokemonCard({
  imgURL,
  name,
  types,
  hp,
  attacks,
  id,
  pokedexNum,
  setSelected,
  card,
}) {
  return (
    <div className="pokemon-card" id={id} onClick={() => setSelected(card)}>
      <img className="pokemon-img" src={imgURL} alt={name}></img>
    </div>
  );
}
