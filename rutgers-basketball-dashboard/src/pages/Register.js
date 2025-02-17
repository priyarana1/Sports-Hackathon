import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Loading from "../components/Loading"; 
import "./Login.css";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(username, password);
    console.log("Register response:", response); // <-- Add this

    if (response.message) {
    setSuccess("Registration successful! Please login.");
    }   
    else {
    setError(response.error || "Registration failed");
    }

  };

  return (
    <div className="login-container">
      <h2 className="login-title">Register</h2>
      {error && <p className="login-error">{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
