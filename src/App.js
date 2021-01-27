import React, { useState } from "react";
import PokemonCardWrapper from "./Components/PokemonCard/PokemonCardWrapper";
import PokemonSearch from "./Components/PokemonSearch/PokemonSearch";
import { ErrorBoundary } from "react-error-boundary";
import { PokemonCacheProvider } from "./Hooks/usePokemonCache";
import SearchedPokemon from "./Components/PokemonSearch/SearchedPokemon";
import PokemonSearchLanding from "./Components/PokemonSearch/PokemonSearchLanding";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonCard from "./Components/PokemonCard/PokemonCard";

import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import PokemonCardDetails from "./Components/PokemonCard/PokemonCardDetails";

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
  const [selected, setSelected] = useState({});

  const handleReset = () => {
    setSearch("");
    setPokemonQuery(initialState);
  };
  const handleSelect = (pokemonName) => {
    setPokemonQuery({ ...initialState, name: pokemonName });
    setSearch(pokemonName);
  };

  return (
    <PokemonCacheProvider>
      <Router>
        <Switch>
          <Route path="/search">
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
              <PokemonCardWrapper
                setSelected={setSelected}
                pokemonQuery={pokemonQuery}
              />
            </ErrorBoundary>
          </Route>
          <Route path="/card/:set/:num" children={<PokemonCard />}>
            <PokemonSearch
              search={search}
              setSearch={setSearch}
              setPokemonQuery={setPokemonQuery}
              searchedPokemon={<SearchedPokemon onSelect={handleSelect} />}
            />
            <PokemonCardDetails selected={selected} setSelected={setSelected} />
          </Route>
          <Route exact path="/">
            <LandingPage>
              <PokemonSearchLanding
                search={search}
                setSearch={setSearch}
                setPokemonQuery={setPokemonQuery}
              />
            </LandingPage>
          </Route>
        </Switch>
      </Router>
    </PokemonCacheProvider>
  );
}

export default App;
