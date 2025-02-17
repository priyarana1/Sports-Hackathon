import axios from "axios";

const API_URL = "http://127.0.0.1:5000"

// registration setup
export const register = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  
// login setup
export const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      const { access_token } = response.data;
      
      // storing token locally
      localStorage.setItem("token", access_token);
      
      return response.data;
    } catch (error) {
      return error.response.data;
    }
};

// logout setup
export const logout = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
    }
};

// check user validity
export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
};
  
  