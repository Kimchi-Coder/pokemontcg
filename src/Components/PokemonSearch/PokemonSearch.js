import React, { useState } from "react";

export default function PokemonSearch({ search, setSearch, setPokemonQuery }) {
  const [selectType, setSelectType] = useState("ALL");
  const [selectSeries, setSelectSeries] = useState("ALL");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonQuery({ name: search, type: selectType, series: selectSeries });
  };

  const pokemonTypes = [
    "ALL",
    "normal",
    "fighting",
    "fire",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
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
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-box">Pokemon Search</label>
      <input id="search-box" onChange={handleChange} value={search} />
      <label htmlFor="search-type">Type</label>
      <select
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
      <button type="submit">Submit</button>
    </form>
  );
}
