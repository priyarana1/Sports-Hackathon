import logo from './logo.svg';
import Leaderboard from './Leaderboard';
import Voting from './Voting';
import Stats from './Stats';
import Rewards from './Rewards';
import './App.css';

function App() {
  return (
    <div Classname = "App">
      <h1> Rutger Basketball Fan Dashboard </h1>
      <Leaderboard/>
      <Voting/>
      <Stats/>
      <Rewards/>
    </div>
  )
}

export default App;