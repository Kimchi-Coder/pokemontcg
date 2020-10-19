import React from "react";

export default function PokemonCardInfo({
  name,
  types,
  hp,
  attacks,
  id,
  pokedexNum,
}) {
  return (
    <>
      <div className="pokemon-name">
        <strong>Name: </strong>
        {name}
        <pre>Pokedex #: {pokedexNum}</pre>
      </div>
      <div className="pokemon-hp">
        <strong>HP: </strong>
        {hp}
      </div>
      <ul>
        <strong>Types: </strong>
        {types ? types.map((type) => <li key={id + type}>{type}</li>) : "none"}
      </ul>
      <ul className="pokemon-attacks">
        {attacks
          ? attacks.map((attack) => (
              <li key={id + "" + name}>
                <p>
                  <strong>Attack Name:</strong> {attack.name}
                </p>{" "}
                <p>
                  <strong>Text: </strong>
                  {attack.text}
                </p>{" "}
                {attack.damage ? (
                  <p>
                    <strong>Dmg: </strong> {attack.damage}
                  </p>
                ) : null}
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
