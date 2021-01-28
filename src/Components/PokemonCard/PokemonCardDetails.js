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
    subtype,
    set: series,
    rarity,
    ability,
    artist: illustrator,
  } = selected;
  return (
    <>
      <div className="details-wrapper">
        <div className="img-wrapper">
          <img
            className="details-img"
            src={imageUrlHiRes}
            alt={`Pokemon card: ${name}`}
          ></img>
        </div>
        <div className="text-wrapper">
          <div className="name-hp-wrapper">
            <div className="pokemon-name">
              <h1>{name}</h1>
            </div>
            <div className="pokemon-hp">
              <strong>HP: </strong>
              {hp}
            </div>
          </div>
          <div className="pokedex-num">Pokedex #: {nationalPokedexNumber}</div>
          <div className="subtype">Subtype: {subtype}</div>
          <div className="set">Set: {series}</div>
          {rarity ? <div className="rarity">Rarity: {rarity}</div> : null}

          <ul className="type">
            <strong>Type: </strong>
            {types
              ? types.map((type) => (
                  <li key={id + type}>
                    <img
                      src={require(`../../assets/svg/types/${type.toLowerCase()}.svg`)}
                      alt={type}
                    ></img>
                  </li>
                ))
              : "none"}
          </ul>
          <ul className="pokemon-ability">
            {ability ? (
              <li key={id + "" + ability.name}>
                <p>
                  <strong>Ability: </strong> {ability.name}
                </p>{" "}
                {ability.text && (
                  <p>
                    <strong>Text: </strong> <span>{ability.text}</span>
                  </p>
                )}
              </li>
            ) : null}
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
          <div className="illustrator">Illustrator: {illustrator}</div>
        </div>
      </div>
    </>
  );
}
