// src/components/Navbar.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Navbar.css";
import logo from "../logo.svg"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo-container" onClick={toggleSidebar}>
          <img src={logo} alt="Rutgers Logo" className="logo-image" />
          <div className="logo-text">Rutgers Basketball</div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        
        <ul className="sidebar-links">
          <li><Link to="/Leaderboard" onClick={toggleSidebar}>Leaderboard</Link></li>
          <li><Link to="/Voting" onClick={toggleSidebar}>Voting</Link></li>
          <li><Link to="/Games" onClick={toggleSidebar}>Games</Link></li>
          <li><Link to="/Standings" onClick={toggleSidebar}>Standings</Link></li>
          <li><Link to="/Rewards" onClick={toggleSidebar}>Rewards</Link></li>
          <li><Link to="/Profile" onClick={toggleSidebar}>Profile</Link></li>
        </ul>

        <div className="sidebar-auth">
          {user ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" onClick={toggleSidebar} className="auth-link">
                Login
              </Link>
              <Link to="/register" onClick={toggleSidebar} className="auth-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
