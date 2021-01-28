import React from "react";

import "./LandingPage.css";

export default function LandingPage({ children }) {
  return (
    <div className="landing-wrapper">
      <div className="pokeball-red">
        <h1>Pokedecks is a Pokemon TCG card search app</h1>
      </div>
      <div className="pokeball-black">{children}</div>
      <div className="pokeball-white"></div>
    </div>
  );
}
