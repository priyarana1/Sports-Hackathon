// Rewards.js
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Rewards.css";

function Rewards() {
  const { user } = useContext(AuthContext); // user might have user.points
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0); // default 0

  useEffect(() => {
    // 1) If user is loaded and has a points property
    if (user && user.points != null) {
      setUserPoints(user.points);
    }
  }, [user]);

  useEffect(() => {
    // 2) Fetch or mock your rewards data
    const fetchRewards = async () => {
      try {
        // Example data
        const mockData = [
          { title: "Free T-Shirt", description: "Exclusive Rutgers T-Shirt", pointsRequired: 100 },
          { title: "VIP Tickets", description: "Courtside seats", pointsRequired: 500 },
        ];
        setRewards(mockData);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  const handleRedeem = (reward) => {
    if (userPoints >= reward.pointsRequired) {
      // Enough points
      setUserPoints((prev) => prev - reward.pointsRequired);
      alert(`You redeemed ${reward.title}!`);
      // Optionally update the user’s points in AuthContext or backend
    } else {
      alert("Not enough points to redeem this reward.");
    }
  };

  return (
    <div className="rewards-page">
      <div className="rewards-hero">
        <h1 className="rewards-hero-title">Rutgers Fan Rewards</h1>
        <p className="rewards-hero-subtitle">
          Earn points by attending games, voting, predicting winners, and more!
        </p>
      </div>

      <div className="points-summary">
        <h2>Your Points</h2>
        <p className="points-amount">{userPoints}</p>
        <p className="points-description">
          Keep participating to earn more points and unlock bigger rewards!
        </p>
      </div>

      <div className="rewards-container">
        <h2 className="rewards-section-title">Available Rewards</h2>
        {loading ? (
          <p className="rewards-loading">Loading rewards...</p>
        ) : rewards.length === 0 ? (
          <p className="rewards-none">No rewards available at the moment. Check back soon!</p>
        ) : (
          <div className="rewards-grid">
            {rewards.map((reward, index) => (
              <div key={index} className="reward-card">
                <h3 className="reward-card-title">{reward.title}</h3>
                <p className="reward-card-desc">{reward.description}</p>
                <p className="reward-card-points">
                  Points Required: <strong>{reward.pointsRequired}</strong>
                </p>
                <button className="reward-redeem-btn" onClick={() => handleRedeem(reward)}>
                  Redeem
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Rewards;
