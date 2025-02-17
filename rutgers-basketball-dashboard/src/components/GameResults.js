
import React, { useEffect, useState } from "react";
import "./GameResults.css";

function formatDate(isoString) {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString;
  return d.toLocaleDateString();
}

function GameResults() {
  const [season, setSeason] = useState("2022"); 
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url =
      season === "2022"
        ? "/Rutgers_Games_2022_2023.json"
        : "/Rutgers_Games_2023_2024.json";
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
        setLoading(false);
      });
  }, [season]);

  return (
    <div className="games-page">
      <h2>Rutgers Game Results</h2>
      <div className="season-toggle">
        <label>Season: </label>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="2022">2022–2023</option>
          <option value="2023">2023–2024</option>
        </select>
      </div>
      {loading ? (
        <p>Loading games...</p>
      ) : (
        <table className="games-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Home Team</th>
              <th>H1</th>
              <th>H2</th>
              <th>Total</th>
              <th>Away Team</th>
              <th>H1</th>
              <th>H2</th>
              <th>Total</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, idx) => {
              const homeTotal = game["Home Team: Total Points"];
              const awayTotal = game["Away Team: Total Points"];
              const winner =
                homeTotal > awayTotal
                  ? game["Home Team"]
                  : game["Away Team"];
              return (
                <tr key={idx}>
                  <td>{formatDate(game.Data)}</td>
                  <td style={{ color: homeTotal > awayTotal ? "green" : "red" }}>
                    {game["Home Team"]}
                  </td>
                  <td
                    style={{
                      color:
                        game["Home Team: H1 Points"] >
                        game["Away Team: H1 Points"]
                          ? "green"
                          : "red",
                    }}
                  >
                    {game["Home Team: H1 Points"]}
                  </td>
                  <td
                    style={{
                      color:
                        game["Home Team: H2 Points"] >
                        game["Away Team: H2 Points"]
                          ? "green"
                          : "red",
                    }}
                  >
                    {game["Home Team: H2 Points"]}
                  </td>
                  <td style={{ color: homeTotal > awayTotal ? "green" : "red" }}>
                    {homeTotal}
                  </td>
                  <td style={{ color: awayTotal > homeTotal ? "green" : "red" }}>
                    {game["Away Team"]}
                  </td>
                  <td
                    style={{
                      color:
                        game["Away Team: H1 Points"] >
                        game["Home Team: H1 Points"]
                          ? "green"
                          : "red",
                    }}
                  >
                    {game["Away Team: H1 Points"]}
                  </td>
                  <td
                    style={{
                      color:
                        game["Away Team: H2 Points"] >
                        game["Home Team: H2 Points"]
                          ? "green"
                          : "red",
                    }}
                  >
                    {game["Away Team: H2 Points"]}
                  </td>
                  <td style={{ color: awayTotal > homeTotal ? "green" : "red" }}>
                    {awayTotal}
                  </td>
                  <td>{winner}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GameResults;
