// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Loading from "./Loading"; 

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/leaderboard') // Update URL as needed
      .then(response => response.json())
      .then(data => {
        setPlayers(data);  // Save the fetched data into state
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    loading && <Loading />;
  }

  return (
    <div className="leaderboard-container">
      {loading && <Loading />}
      <h2 className="leaderboard-title">Top Users</h2>
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
              <td>{player.name}</td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
