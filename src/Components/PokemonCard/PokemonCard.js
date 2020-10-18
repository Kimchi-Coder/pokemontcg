import React from "react";

export default function PokemonCard({ name, types, hp, attacks, imgURL }) {
  return (
    <div className="pokemon-card">
      <img className="pokemon-img" src={imgURL} alt={name}></img>
      <div className="pokemon-name">Name: {name}</div>
      <div className="pokemon-hp">HP: {hp}</div>
      <ul>
        Types:
        {types ? types.map((type) => <li>{type}</li>) : "none"}
      </ul>
      <ul className="pokemon-attacks">
        {attacks.map((attack) => (
          <li>
            <span>Attack Name: {attack.name}</span>{" "}
            <span>Text: {attack.text}</span> <span>Dmg: {attack.damage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
