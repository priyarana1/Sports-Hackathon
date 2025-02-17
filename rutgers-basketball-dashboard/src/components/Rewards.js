// src/components/Rewards.js
import React, { useState, useEffect } from 'react';
import './Rewards.css';
import Loading from "./Loading"; 

function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/rewards') 
      .then(response => response.json())
      .then(data => {
        setRewards(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching rewards:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="rewards-container">
      {loading && <Loading />}
      <h2>Your Rewards</h2>
      <div className="rewards-list">
        {rewards.map((reward, index) => (
          <div key={index} className="reward-card">
            <h3>{reward.title}</h3>
            <p>{reward.description}</p>
            <p>Points Required: {reward.pointsRequired}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rewards;
