// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Set your API base URL (adjust port if needed)
const API_URL = "http://127.0.0.1:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user info on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/api/current_user`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error("Error fetching user info:", err.response);
          localStorage.removeItem("token");
        });
    }
  }, []);

  // Register: expects email, name, and password
  const register = async (email, name, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        name,
        password
      });
      return response.data; // e.g., { message: "User registered successfully" }
    } catch (error) {
      console.error("Registration error:", error.response);
      return { error: "Registration failed" };
    }
  };

  // Login: expects email and password
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        setUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response);
      return { error: "Login failed" };
    }
  };

  // Logout endpoint
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.response);
    }
  };

  // Update Profile: expects new name and email
  const updateProfile = async (name, email) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/update_profile`,
        { name, email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (response.data.user) {
        setUser((prev) => ({ ...prev, ...response.data.user }));
      }
      return response.data;
    } catch (error) {
      console.error("Update profile error:", error.response);
      return { error: "Profile update failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
