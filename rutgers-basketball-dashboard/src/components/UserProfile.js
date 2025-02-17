import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "./UserProfile.css";

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);

  // Load the user’s current info on mount
  useEffect(() => {
    if (user) {
      setName(user.name || "Default User");
      setEmail(user.email || "default@example.com");
    }
  }, [user]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    // Here you’d call your update user API or context function
    console.log("Saving new name:", name, "and email:", email);
    // e.g., updateUserProfile(name, email)
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>

        <div className="profile-info">
          <div className="profile-row">
            <label className="profile-label">Name:</label>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{name}</span>
            )}
          </div>

          <div className="profile-row">
            <label className="profile-label">Email:</label>
            {editing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{email}</span>
            )}
          </div>
        </div>

        <div className="profile-actions">
          {editing ? (
            <>
              <button className="profile-btn save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="profile-btn cancel-btn" onClick={handleEditToggle}>
                Cancel
              </button>
            </>
          ) : (
            <button className="profile-btn edit-btn" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
