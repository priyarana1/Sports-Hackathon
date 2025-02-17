// src/pages/Stats.js
import React, { useEffect, useState } from "react";
import "./Stats.css";

/**
 * UTILITY FUNCTION: Format a date string like "2022-11-08T00:00:00+00:00" 
 * into something more readable, e.g. "11/08/2022".
 */
function formatDate(isoString) {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString;
  return d.toLocaleDateString();
}

function Stats() {
  // 1) Team summary data
  const [teamSummary, setTeamSummary] = useState(null);

  // 2) Season toggle & game data
  const [season, setSeason] = useState("2022"); // default to 2022-2023
  const [games, setGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);

  // 3) NCAA Standings
  const [standings, setStandings] = useState({});
  const [loadingStandings, setLoadingStandings] = useState(true);

  /**
   * Fetch Rutgers team summary (file 3).
   * Example file name: public/rutgers_team_summary.json
   */
  useEffect(() => {
    fetch("/rutgers_team_summary.json")
      .then((res) => res.json())
      .then((data) => {
        // data might be an array with one object
        if (Array.isArray(data) && data.length > 0) {
          setTeamSummary(data[0]);
        }
      })
      .catch((err) => console.error("Error fetching team summary:", err));
  }, []);

  /**
   * Fetch the appropriate Rutgers games based on the "season" toggle 
   * (2022–2023 or 2023–2024).
   */
  useEffect(() => {
    let url =
      season === "2022"
        ? "/Rutgers_Games_2022_2023.json" // file 1
        : "/Rutgers_Games_2023_2024.json"; // file 2

    setLoadingGames(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoadingGames(false);
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
        setLoadingGames(false);
      });
  }, [season]);

  /**
   * Fetch NCAA Standings (file 4). We'll just show "Big Ten" for demonstration.
   */
  useEffect(() => {
    setLoadingStandings(true);
    fetch("/DF_NCAA_Standings.json")
      .then((res) => res.json())
      .then((data) => {
        setStandings(data);
        setLoadingStandings(false);
      })
      .catch((err) => {
        console.error("Error fetching standings:", err);
        setLoadingStandings(false);
      });
  }, []);

  /**
   * HELPER: Get the "Big Ten" array from the standings object.
   * The file structure suggests something like data.conferences["Big Ten"] = [...]
   */
  const bigTenTeams = (() => {
    if (!standings.conferences) return [];
    const conf = standings.conferences["Big Ten"];
    return Array.isArray(conf) ? conf : [];
  })();

  return (
    <div className="stats-page">
      {/* Team Summary Card */}
      {teamSummary && (
        <div className="team-summary-card">
          <h2>{teamSummary["Team Name"]} Summary</h2>
          <p>Games Played: {teamSummary["Games Played"]}</p>
          <p>Wins: {teamSummary["Wins"]}</p>
          <p>Losses: {teamSummary["Losses"]}</p>
          <p>Points For: {teamSummary["Points For"]}</p>
          <p>Points Against: {teamSummary["Points Against"]}</p>
          <p>Avg Points Scored: {teamSummary["Avg Points Scored"]}</p>
          <p>Avg Points Allowed: {teamSummary["Avg Points Allowed"]}</p>
        </div>
      )}

      {/* Game Results Section */}
      <div className="games-section">
        <h2>Rutgers Game Results</h2>
        <div className="season-toggle">
          <label>Season:</label>
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="2022">2022–2023</option>
            <option value="2023">2023–2024</option>
          </select>
        </div>

        {loadingGames ? (
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
                    <td
                      style={{
                        color: homeTotal > awayTotal ? "green" : "red",
                      }}
                    >
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
                    <td
                      style={{
                        color: homeTotal > awayTotal ? "green" : "red",
                      }}
                    >
                      {homeTotal}
                    </td>

                    <td
                      style={{
                        color: awayTotal > homeTotal ? "green" : "red",
                      }}
                    >
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
                    <td
                      style={{
                        color: awayTotal > homeTotal ? "green" : "red",
                      }}
                    >
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

      {/* NCAA Standings (Big Ten) */}
      <div className="standings-section">
        <h2>Big Ten Standings</h2>
        {loadingStandings ? (
          <p>Loading standings...</p>
        ) : (
          <table className="standings-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Team Name</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win %</th>
                <th>Points For</th>
                <th>Points Against</th>
                <th>Point Diff</th>
              </tr>
            </thead>
            <tbody>
              {bigTenTeams.map((team, idx) => {
                const isRutgers = team.team_name === "Rutgers";
                return (
                  <tr key={idx} style={{ backgroundColor: isRutgers ? "#ffe0e0" : "transparent" }}>
                    <td>{team.position}</td>
                    <td>{team.team_name}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.win_percentage}</td>
                    <td>{team.points_for}</td>
                    <td>{team.points_against}</td>
                    <td>{team.point_differential}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Stats;
