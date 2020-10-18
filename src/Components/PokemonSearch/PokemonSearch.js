import React from "react";

export default function PokemonSearch({ search, setSearch, setPokemonQuery }) {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonQuery(search);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-box">Pokemon Search</label>
      <input id="search-box" onChange={handleChange} value={search} />
      <button type="submit">Submit</button>
    </form>
  );
}
