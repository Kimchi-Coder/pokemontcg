import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="loading-circle"></div>
      <div className="loading-circle"></div>
      <div className="loading-circle"></div>
      <div className="loading-shadow"></div>
      <div className="loading-shadow"></div>
      <div className="loading-shadow"></div>
      <span>Loading</span>
    </div>
  );
}
