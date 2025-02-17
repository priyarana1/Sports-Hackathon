// src/components/LoadingOverlay.js
import React from "react";
import "./Loading.css";

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingOverlay;
