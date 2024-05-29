import './App.css'
import Board from './components/Board.jsx'
import { useState } from 'react'
import Start from './components/Start.jsx';
function App() {
  
  const [hasStarted, setHasStarted] = useState(false);
  const handleStart=()=>{
    setHasStarted((prev)=>!prev);
  }
  const handleStartGame = () => {
    setHasStarted((prev) =>true);
  }
  const handleHomePage = () => {
    setHasStarted((prev) =>false);
  }
  return (
    <>
      {hasStarted ? <Board handleStart={handleStart}/> :<Start onClick={handleStartGame}/>}
    </>
  )
}

export default App
