import logo from './logo.svg';
import React from "react"
import Leaderboard from "./components/Leaderboard";
import Voting from "./components/Votingapp";
import Stats from "./components/Stats";
import Rewards from "./components/Rewards";
import './App.css';

function App() {
  return (
    <div Classname = "App">
      <h1> Rutger Basketball Fan Dashboard </h1>
      <Leaderboard/>
    </div>
  )
}

export default App;