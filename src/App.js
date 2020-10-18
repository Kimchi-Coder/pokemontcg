import React, { useState, useReducer, useEffect } from "react";
import "./App.css";
import PokemonCardWrapper from "./Components/PokemonCard/PokemonCardWrapper";
import PokemonSearch from "./Components/PokemonSearch/PokemonSearch";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error: {error.message}
      <button onClick={resetErrorBoundary}>Reset</button>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [pokemonQuery, setPokemonQuery] = useState("");

  const handleReset = () => setPokemonQuery("");

  return (
    <>
      <div className="App"> Pokemon TCG</div>
      <PokemonSearch
        search={search}
        setSearch={setSearch}
        setPokemonQuery={setPokemonQuery}
      />
      <ErrorBoundary
        FallbackComponent={ErrorFallBack}
        onReset={handleReset}
        resetKeys={[pokemonQuery]}
      >
        <PokemonCardWrapper pokemonQuery={pokemonQuery} />
      </ErrorBoundary>
    </>
  );
}

export default App;
