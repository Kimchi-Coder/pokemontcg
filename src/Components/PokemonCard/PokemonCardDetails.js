import React from "react";
import "./PokemonCardDetails.css";
import { useParams } from "react-router-dom";

export default function PokemonCardDetails({ selected, setSelected }) {
  const { set, num } = useParams();

  const { name, types, hp, attacks, id, pokedexNum, imageUrlHiRes } = selected;
  return (
    <>
      <img
        className="details-img"
        src={imageUrlHiRes}
        alt={`Pokemon card: ${name}`}
      ></img>
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
        {types
          ? types.forEach((type) => <li key={id + type}>{type}</li>)
          : "none"}
      </ul>
      <ul className="pokemon-attacks">
        {attacks
          ? attacks.map((attack) => (
              <li key={id + "" + name}>
                <p>
                  <strong>Attack Name:</strong> {attack.name}
                </p>{" "}
                {attack.text && (
                  <p>
                    <strong>Text: </strong> <span>{attack.text}</span>
                  </p>
                )}
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
