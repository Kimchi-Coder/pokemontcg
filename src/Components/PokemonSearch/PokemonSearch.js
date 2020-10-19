import React, { useState } from "react";
import "./PokemonSearch.css";
import { useHistory } from "react-router-dom";

export default function PokemonSearch({
  search,
  setSearch,
  setPokemonQuery,
  searchedPokemon,
}) {
  const [selectType, setSelectType] = useState("ALL");
  const [selectSeries, setSelectSeries] = useState("ALL");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonQuery({
      name: search,
      type: selectType === "ALL" ? "" : selectType,
      series: selectSeries === "ALL" ? "" : selectSeries,
    });

    history.push("/search");
  };

  const pokemonTypes = [
    "ALL",
    "Normal",
    "Fighting",
    "Fire",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy",
  ].sort((a, b) => a > b);

  const series = [
    "ALL",
    "Base",
    "XY",
    "Diamond & Pearl",
    "Sun & Moon",
    "HeartGold & SoulSilver",
    "Sword & Shield",
    "Black & White",
    "EX",
    "E-Card",
    "Neo",
    "BW",
    "Platinum",
    "Gym",
    "POP",
  ].sort((a, b) => a > b);

  const history = useHistory();
  return (
    <>
      <form className="pokemon-search" onSubmit={handleSubmit}>
        <input
          id="search-box"
          onChange={handleChange}
          value={search}
          placeholder="Search for a pokemon!"
          autoFocus
        />
        <label htmlFor="search-type">Type</label>
        <select
          style={{ width: "12ch" }}
          name="search-type"
          id="search-type"
          onChange={(e) => setSelectType(e.target.value)}
        >
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label htmlFor="search-series">Series</label>
        <select
          style={{ width: "25ch" }}
          name="search-series"
          id="search-series"
          onChange={(e) => setSelectSeries(e.target.value)}
        >
          {series.map((series) => (
            <option key={series} value={series}>
              {series}
            </option>
          ))}
        </select>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      <div className="searched-wrapper">{searchedPokemon}</div>
    </>
  );
}
