import React from "react";
import "./PokemonCard.css";

export default function PokemonCard({ name, types, hp, attacks, imgURL, id }) {
  return (
    <div className="pokemon-card" key={id}>
      <img className="pokemon-img" src={imgURL} alt={name}></img>
      <div className="pokemon-name">Name: {name}</div>
      <div className="pokemon-hp">HP: {hp}</div>
      <ul>
        Types:
        {types ? types.map((type) => <li key={id + type}>{type}</li>) : "none"}
      </ul>
      <ul className="pokemon-attacks">
        {attacks.map((attack) => (
          <li key={id + "" + name}>
            <span>Attack Name: {attack.name}</span>{" "}
            <span>Text: {attack.text}</span>{" "}
            <span>{attack.damage ? `Dmg: ${attack.damage}` : null}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
