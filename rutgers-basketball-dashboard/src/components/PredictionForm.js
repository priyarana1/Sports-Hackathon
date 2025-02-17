// src/components/PredictionForm.js
import React, { useState } from 'react';
import './PredictionForm.css';

function PredictionForm() {
  const [gameWinner, setGameWinner] = useState('');
  const [topScorer, setTopScorer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const prediction = { gameWinner, topScorer };

    fetch('http://localhost:8000/api/predictions', { // Update URL as needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prediction)
    })
      .then(response => response.json())
      .then(data => {
        alert("Prediction submitted!");
        // Reset the form
        setGameWinner('');
        setTopScorer('');
      })
      .catch(error => {
        console.error("Error submitting prediction:", error);
      });
  };

  return (
    <div className="prediction-form-container">
      <h2>Make Your Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gameWinner">Game Winner:</label>
          <input
            type="text"
            id="gameWinner"
            value={gameWinner}
            onChange={(e) => setGameWinner(e.target.value)}
            placeholder="Enter team name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="topScorer">Top Scorer:</label>
          <input
            type="text"
            id="topScorer"
            value={topScorer}
            onChange={(e) => setTopScorer(e.target.value)}
            placeholder="Enter player name"
            required
          />
        </div>
        <button type="submit">Submit Prediction</button>
      </form>
    </div>
  );
}

export default PredictionForm;
