// src/pages/Login.js
import React, { useState, useContext } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config"; // You'll need to create this
import AuthContext from "../context/AuthContext";
import Loading from "../components/Loading";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // You can handle the successful login here
      // For example, you might want to call your login context method
      if (user) {
        await login(user);
      }
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading && <Loading />}
      <h2 className="form-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <button 
        onClick={handleGoogleSignIn} 
        className="google-sign-in-button"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
