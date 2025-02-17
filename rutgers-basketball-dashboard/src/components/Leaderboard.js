// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import './Leaderboard.css';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/leaderboard') // Update URL as needed
      .then(response => response.json())
      .then(data => {
        UserProfile(data);
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
      <h2>Top User</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User Name</th>
            <th>Points</th>
           
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id || index}>
              <td>{index + 1}</td>
              <td>{UserProfile.name}</td>
              <td>{UserProfile.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
