import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ Remove BrowserRouter from here!
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./components/Leaderboard";
import Voting from "./components/VotingApp";
import Stats from "./components/Stats";
import Rewards from "./components/Rewards";
import Profile from "./components/UserProfile";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profile />} />

        {/* Default Route */}
        <Route path="/" element={<Leaderboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
