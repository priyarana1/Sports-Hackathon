import React, { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/leaderboard") // Make sure this API exists in your backend
            .then((response) => {
                setUsers(response.data); // Update the leaderboard with user rankings
            })
            .catch((error) => console.error("Error fetching leaderboard:", error));
    }, []);

    return (
        <div className="leaderboardstyle">   
            {/*This creates a leaderboard title*/}
            <h2> Leaderboard</h2>

            {/*This creates a table*/}
            <table className="tablestyle">
                {/*This creates a table header*/}
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Points</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 ? (
                        users.slice(0, 5).map((user, index) => ( // 🔹 Only take the first 5 users
                            <tr key={index}>
                                <td>{user.rank}</td>
                                <td>{user.username}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;