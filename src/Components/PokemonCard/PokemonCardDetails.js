import React, { useEffect } from "react";
import "./PokemonCardDetails.css";
import { useParams } from "react-router-dom";

export default function PokemonCardDetails({ selected, setSelected }) {
  const { set, num } = useParams();

  useEffect(() => {
    if (!selected.card) {
      fetch(`https://api.pokemontcg.io/v1/cards/${set}-${num}`)
        .then((data) => data.json())
        .then((result) => setSelected(result.card));
    }
  }, [set, num, setSelected, selected.card]);
  const {
    name,
    types,
    hp,
    attacks,
    id,
    nationalPokedexNumber,
    imageUrlHiRes,
  } = selected;
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
        <pre>Pokedex #: {nationalPokedexNumber}</pre>
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
              <li key={id + "" + attack.name}>
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
