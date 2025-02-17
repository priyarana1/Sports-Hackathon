import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Backend API URL (Change if needed)
const API_URL = "http://127.0.0.1:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const register = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, password });
      return response.data;
    } catch (error) {
      return error.response?.data || { error: "Registration failed" };
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      const { access_token } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", access_token);
      setUser({ token: access_token });

      return response.data;
    } catch (error) {
      return error.response?.data || { error: "Invalid credentials" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
