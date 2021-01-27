import React, { useState, useEffect } from "react";
import PokemonCardInfo from "./PokemonCardInfo";
export default function FakeCard({
  name,
  types,
  hp,
  attacks,
  id,
  imgURL,
  pokedexNum,
}) {
  const [state, setState] = useState("");

  return (
    <>
      {" "}
      <img className="pokemon-img" src={imgURL} alt={name}></img>
      <PokemonCardInfo
        name={name}
        types={types}
        hp={hp}
        attacks={attacks}
        id={id}
        pokedexNum={pokedexNum}
        onClick={() => {
          setState(state + 1);
        }}
      />
    </>
  );
}
