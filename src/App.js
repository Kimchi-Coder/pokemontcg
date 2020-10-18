import React, { useState, useReducer, useEffect } from "react";
import "./App.css";
import PokemonCardWrapper from "./Components/PokemonCard/PokemonCardWrapper";
import PokemonSearch from "./Components/PokemonSearch/PokemonSearch";

function App() {
  const [search, setSearch] = useState("");
  const [pokemonQuery, setPokemonQuery] = useState({});
  return (
    <>
      <div className="App"> Pokemon TCG</div>
      <PokemonSearch
        search={search}
        setSearch={setSearch}
        setPokemonQuery={setPokemonQuery}
      />
      <PokemonCardWrapper />
    </>
  );
}

export default App;
