// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import PredictionForm from './components/PredictionForm';
import VotingApp from './components/PredictionForm';
import Stats from './components/Stats';
import Rewards from './components/Rewards';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rutgers Basketball Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/">Leaderboard</Link></li>
            <li><Link to="/prediction">Prediction</Link></li>
            <li><Link to="/voting">Voting</Link></li>
            <li><Link to="/stats">Stats</Link></li>
            <li><Link to="/rewards">Rewards</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/prediction" element={<PredictionForm />} />
          <Route path="/voting" element={<VotingApp />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2025 Rutgers Basketball</p>
      </footer>
    </div>
  );
}

export default App;
