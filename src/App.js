import React, { useState } from "react";
import PokemonCardWrapper from "./Components/PokemonCard/PokemonCardWrapper";
import PokemonSearch from "./Components/PokemonSearch/PokemonSearch";
import { ErrorBoundary } from "react-error-boundary";
import { PokemonCacheProvider } from "./Hooks/usePokemonCache";
import SearchedPokemon from "./Components/PokemonSearch/SearchedPokemon";
import PokemonSearchLanding from "./Components/PokemonSearch/PokemonSearchLanding";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";

function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error: {error.message}
      <button onClick={resetErrorBoundary}>Reset</button>
    </div>
  );
}

const initialState = { name: "", type: "", series: "" };

function App() {
  const [search, setSearch] = useState("");
  const [pokemonQuery, setPokemonQuery] = useState(initialState);

  const handleReset = () => {
    setSearch("");
    setPokemonQuery(initialState);
  };
  const handleSelect = (pokemonName) => {
    setPokemonQuery({ ...initialState, name: pokemonName });
    setSearch(pokemonName);
  };

  return (
    <Router>
      <Switch>
        <Route path="/search">
          <PokemonCacheProvider>
            <PokemonSearch
              search={search}
              setSearch={setSearch}
              setPokemonQuery={setPokemonQuery}
              searchedPokemon={<SearchedPokemon onSelect={handleSelect} />}
            />

            <ErrorBoundary
              FallbackComponent={ErrorFallBack}
              onReset={handleReset}
              resetKeys={[pokemonQuery]}
            >
              <PokemonCardWrapper pokemonQuery={pokemonQuery} />
            </ErrorBoundary>
          </PokemonCacheProvider>
        </Route>
        <Route path="/">
          <PokemonCacheProvider>
            <LandingPage>
              <PokemonSearchLanding
                search={search}
                setSearch={setSearch}
                setPokemonQuery={setPokemonQuery}
              />
            </LandingPage>
          </PokemonCacheProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
