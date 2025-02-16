// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/leaderboard') // Update URL as needed
      .then(response => response.json())
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  return (
    <div className="leaderboard-container">
      <h2>Top Players</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player Name</th>
            <th>Points</th>
            <th>Rebounds</th>
            <th>Assists</th>
            <th>Defense</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id || index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.points}</td>
              <td>{player.rebounds}</td>
              <td>{player.assists}</td>
              <td>{player.defense}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
