import React, { useContext, createContext, useReducer } from "react";

const PokemonCacheContext = createContext();

const pokemonCacheReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POKEMON": {
      return { ...state, [action.name]: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export function usePokemonCache() {
  const context = useContext(PokemonCacheContext);
  if (!context) {
    throw new Error(
      "usePokemonCache must be used within a PokemonCacheProvider"
    );
  }
  return context;
}

let initialLocalCache;

if (window.localStorage.getItem("cache") === "undefined") {
  window.localStorage.removeItem("cache");
  initialLocalCache = {};
} else {
  initialLocalCache = JSON.parse(window.localStorage.getItem("cache"));
}

export function PokemonCacheProvider(props) {
  const [cache, cacheDispatch] = useReducer(
    pokemonCacheReducer,
    initialLocalCache
  );

  const value = [cache, cacheDispatch];
  return <PokemonCacheContext.Provider value={value} {...props} />;
}
