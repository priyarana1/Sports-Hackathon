import React, { useEffect, useState } from "react";
import "./VotingApp.css";

function VotingApp() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWinner, setSelectedWinner] = useState({});

  useEffect(() => {
    const fetchGames = async () => {
      try {

        const mockData = [
          {
            gameId: 1,
            homeTeam: "Rutgers",
            homeTeamLogo: "https://media.api-sports.io/basketball/teams/2096.png",
            awayTeam: "Indiana",
            awayTeamLogo: "https://media.api-sports.io/basketball/teams/189.png",
            date: "2024-02-10T19:00:00Z"
          },
          {
            gameId: 2,
            homeTeam: "Michigan",
            homeTeamLogo: "https://media.api-sports.io/basketball/teams/1994.png",
            awayTeam: "Rutgers",
            awayTeamLogo: "https://media.api-sports.io/basketball/teams/2096.png",
            date: "2024-02-15T22:00:00Z"
          }
        ];
        setGames(mockData);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleWinnerChange = (gameId, winner) => {
    setSelectedWinner((prev) => ({ ...prev, [gameId]: winner }));
  };

  const handleVoteSubmit = (game) => {
    const winner = selectedWinner[game.gameId];
    if (!winner) {
      alert("Please select a winner before submitting!");
      return;
    }
    console.log(`Voted for game ${game.gameId} winner: ${winner}`);
    alert(`Your vote for ${winner === "Home" ? game.homeTeam : game.awayTeam} has been submitted!`);
  };

  return (
    <div className="voting-page">
      <div className="voting-hero">
        <h1 className="voting-hero-title">Vote for Points</h1>
        <p className="voting-hero-subtitle">
          Predict the winner of upcoming games. Earn points for correct predictions!
        </p>
      </div>

      <div className="voting-container">
        <h2 className="voting-section-title">Upcoming Games</h2>
        {loading ? (
          <p className="voting-loading">Loading games...</p>
        ) : games.length === 0 ? (
          <p className="voting-none">No upcoming games at the moment.</p>
        ) : (
          <div className="voting-grid">
            {games.map((game) => {
              const gameDate = new Date(game.date).toLocaleString();
              const selected = selectedWinner[game.gameId];
              return (
                <div key={game.gameId} className="voting-card">
                  <div className="teams">
                    <div className="team-info">
                      {game.homeTeamLogo && (
                        <img src={game.homeTeamLogo} alt={game.homeTeam} className="team-logo" />
                      )}
                      <p className="team-name">{game.homeTeam}</p>
                      <label>
                        <input
                          type="radio"
                          name={`winner-${game.gameId}`}
                          value="Home"
                          checked={selected === "Home"}
                          onChange={() => handleWinnerChange(game.gameId, "Home")}
                        />
                        Pick Home
                      </label>
                    </div>

                    <div className="vs-label">VS</div>

                    <div className="team-info">
                      {game.awayTeamLogo && (
                        <img src={game.awayTeamLogo} alt={game.awayTeam} className="team-logo" />
                      )}
                      <p className="team-name">{game.awayTeam}</p>
                      <label>
                        <input
                          type="radio"
                          name={`winner-${game.gameId}`}
                          value="Away"
                          checked={selected === "Away"}
                          onChange={() => handleWinnerChange(game.gameId, "Away")}
                        />
                        Pick Away
                      </label>
                    </div>
                  </div>

                  <p className="game-date">Date: {gameDate}</p>

                  <button className="vote-submit-btn" onClick={() => handleVoteSubmit(game)}>
                    Submit Vote
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default VotingApp;
