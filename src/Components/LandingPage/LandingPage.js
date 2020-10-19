import React from "react";

import "./LandingPage.css";

export default function LandingPage({ children }) {
  return (
    <div className="landing-wrapper">
      <h1>Pokedecks is a Pokemon TCG card search app</h1>
      {children}
    </div>
  );
}
