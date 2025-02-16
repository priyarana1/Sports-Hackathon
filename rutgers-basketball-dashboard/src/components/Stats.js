import React, { useState, useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';


function Stats() {
  const [playerPPG, setPlayerPPG] = useState([]);
  const [gamesWonData, setGamesWonData] = useState([]);


  const COLORS = ['#FF0000', '#0000FF', '#00FF00', '#F0F0F0'];


  useEffect(() => {
   
    fetch('http://localhost:8000/api/stats')
      .then((res) => res.json())
      .then((data) => {
     
        setPlayerPPG(data.playerPPG);
        setGamesWonData(data.gamesWon);
      })
      .catch((error) => console.error('Error fetching stats:', error));
  }, []);


  return (
    <div className="statsboard">
      <h2>Rutgers Players PPG</h2>
      <BarChart width={500} height={300} data={playerPPG}>
        <XAxis dataKey="player" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ppg" fill="#8884d8" />
      </BarChart>


      <h2>Games Won This Season</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={gamesWonData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {gamesWonData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}


export default Stats;




