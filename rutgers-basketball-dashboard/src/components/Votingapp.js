// src/components/VotingApp.js
import React, { useState, useEffect } from 'react';
import './VotingApp.css';
import Loading from "./Loading"; 

function VotingApp() {
  const [votes, setVotes] = useState([]);
  const [selectedVote, setSelectedVote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/votes')
      .then(response => response.json())
      .then(data => {
        setVotes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching voting options:", error);
        setLoading(false);
      });
  }, []);

  const handleVote = (voteOption) => {
    fetch('http://localhost:8000/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vote: voteOption })
    })
      .then(response => response.json())
      .then(data => {
        alert("Vote submitted!");
        setSelectedVote(voteOption);
      })
      .catch(error => {
        console.error("Error submitting vote:", error);
      });
  };

  return (
    <div className="voting-container">
      {loading && <Loading />}
      <h2>Vote for Points</h2>
      <ul className="voting-list">
        {votes.map((option, index) => (
          <li key={index}>
            <span>{option.name}</span>
            <button onClick={() => handleVote(option.name)}>Vote</button>
          </li>
        ))}
      </ul>
      {selectedVote && <p>You voted for: {selectedVote}</p>}
    </div>
  );
}

export default VotingApp;
