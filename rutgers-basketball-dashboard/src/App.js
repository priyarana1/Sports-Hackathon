import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ Remove BrowserRouter from here!
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./components/Leaderboard";
import Voting from "./components/Votingapp";
import GameResults from "./components/GameResults";
import Standings from "./components/Standings";
import Rewards from "./components/Rewards";
import Profile from "./components/UserProfile";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Voting" element={<Voting />} />
        <Route path="/Games" element={<GameResults />} />
        <Route path="/Standings" element={<Standings />} />
        <Route path="/Rewards" element={<Rewards />} />
        <Route path="/Profile" element={<Profile />} />

        {/* Default Route */}
        <Route path="/" element={<Leaderboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
