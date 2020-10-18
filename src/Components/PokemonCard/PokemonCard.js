import React from "react";
import "./PokemonCard.css";

export default function PokemonCard({ name, types, hp, attacks, imgURL, id }) {
  return (
    <div className="pokemon-card" key={id}>
      <img className="pokemon-img" src={imgURL} alt={name}></img>
      <div className="pokemon-name">
        <strong>Name: </strong>
        {name}
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
        {attacks.map((attack) => (
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
        ))}
      </ul>
    </div>
  );
}
