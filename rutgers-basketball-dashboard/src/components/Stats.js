// src/components/Stats.js
import React, { useState, useEffect } from 'react';
import './Stats.css';

function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/stats') // Update URL as needed
      .then(response => response.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="stats-container">
      <h2>Team and Player Statistics</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={index}>
              <td>{stat.category}</td>
              <td>{stat.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
