// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Loading from "./Loading"; 

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
  });
  const token = localStorage.getItem('authToken');


  useEffect(() => {
    fetch('http://localhost:8000/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setFormState({ name: data.name, email: data.email, });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
  }, [token]);


  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formState)
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setEditing(false);
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      {loading && <Loading />}
      <h2>User Profile</h2>
      {profile && !editing && (
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <button onClick={handleEditToggle}>Edit Profile</button>
        </div>
      )}
      {editing && (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formState.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formState.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleEditToggle}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default UserProfile;
