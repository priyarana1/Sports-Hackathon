import React, { useEffect, useState } from "react";
import "./Standings.css";

function calculateWinPercentage(wins, losses) {
  return wins + losses > 0 ? (wins / (wins + losses)).toFixed(3) : "0.000";
}

function Standings() {
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);
  // "by" = view by conference; "all" = all teams sorted
  const [standingsMode, setStandingsMode] = useState("by");
  const [selectedConference, setSelectedConference] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/DF_NCAA_Standings.json")
      .then((res) => res.json())
      .then((data) => {
        setStandings(data);
        setLoading(false);
        if (data.conferences) {
          const confNames = Object.keys(data.conferences);
          if (confNames.length > 0) {
            setSelectedConference(confNames[0]);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching standings:", err);
        setLoading(false);
      });
  }, []);

  const getAllTeams = () => {
    if (!standings.conferences) return [];
    return Object.entries(standings.conferences).flatMap(([conf, teams]) =>
      Array.isArray(teams)
        ? teams.map((team) => ({ ...team, conference: conf }))
        : []
    );
  };

  const sortedTeams = getAllTeams().sort((a, b) => {
    const aWin =
      parseFloat(a.win_percentage) ||
      parseFloat(calculateWinPercentage(a.wins, a.losses));
    const bWin =
      parseFloat(b.win_percentage) ||
      parseFloat(calculateWinPercentage(b.wins, b.losses));
    return bWin - aWin;
  });

  return (
    <div className="standings-page">
      <h1>NCAA Standings</h1>
      <div id="toggleContainer" className="view-toggle">
        <label htmlFor="standingsModeSelect">View: </label>
        <select
          id="standingsModeSelect"
          value={standingsMode}
          onChange={(e) => setStandingsMode(e.target.value)}
        >
          <option value="by">By Conference</option>
          <option value="all">All Standings</option>
        </select>
      </div>

      {loading ? (
        <p>Loading standings...</p>
      ) : standingsMode === "by" ? (
        <>
          <div className="conference-select">
            <label htmlFor="conferenceSelect">Select Conference: </label>
            <select
              id="conferenceSelect"
              value={selectedConference}
              onChange={(e) => setSelectedConference(e.target.value)}
            >
              {standings.conferences &&
                Object.keys(standings.conferences).map((conf, idx) => (
                  <option key={idx} value={conf}>
                    {conf}
                  </option>
                ))}
            </select>
          </div>
          {selectedConference && standings.conferences[selectedConference] && (
            <div className="conference-section">
              <h3 className="conference-title">
                {selectedConference} Standings
              </h3>
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
                  {standings.conferences[selectedConference].map((team, idx) => (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor:
                          team.team_name === "Rutgers" ? "#ffe0e0" : "transparent",
                      }}
                    >
                      <td>{team.position}</td>
                      <td>{team.team_name}</td>
                      <td>{team.wins}</td>
                      <td>{team.losses}</td>
                      <td>
                        {team.win_percentage ||
                          calculateWinPercentage(team.wins, team.losses)}
                      </td>
                      <td>{team.points_for}</td>
                      <td>{team.points_against}</td>
                      <td>{team.point_differential}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        
        <div className="conference-section">
          <h3 className="conference-title">All NCAA Standings</h3>
          <table className="standings-table">
            <thead>
              <tr>
                <th>Conference</th>
                <th>Rank</th>
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
              {sortedTeams.map((team, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor:
                      team.team_name === "Rutgers" ? "#ffe0e0" : "transparent",
                  }}
                >
                  <td>{team.conference}</td>
                  <td>{idx + 1}</td>
                  <td>{team.team_name}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>
                    {team.win_percentage ||
                      calculateWinPercentage(team.wins, team.losses)}
                  </td>
                  <td>{team.points_for}</td>
                  <td>{team.points_against}</td>
                  <td>{team.point_differential}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Standings;
