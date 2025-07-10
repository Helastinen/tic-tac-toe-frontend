import { useState } from "react";
import Grid from "./Grid";
import MoveHistory from "./MoveHistory";
import Status from "./status";

const Game = () => {
  const [winningResult, setWinningResult] = useState(null);
  const [nextIsX, setNextIsX] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentGrid = history[history.length - 1];
  const winningValue = winningResult?.value ?? null;
  const winningLine = winningResult?.winningLine ?? null;

  console.log("history: ", history);
  console.log("currentGrid : ", currentGrid);
  console.log("----------");

  const handlePlay = (nextGrid, nextIsX) => {
    setWinningResult(calculateWinningResult(nextGrid));
    setNextIsX(!nextIsX);
    setHistory([...history, nextGrid]);
  };

  const handleReset = () => {
    setWinningResult(null);
    setNextIsX(true);
    setHistory([Array(9).fill(null)]);
  };

  if (!currentGrid) return <div>Loading board...</div>;

  return (
    <div className="game">
      <div className="game-board">
        <Status 
          winningValue={winningValue}
          nextIsX={nextIsX}
          grid={currentGrid}
          onReset={handleReset}
        />
        <Grid 
          winningLine={winningLine}
          nextIsX={nextIsX}
          grid={currentGrid}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <MoveHistory history={history} />
      </div>
    </div>
  )
};

const calculateWinningResult = (grid) => {
  console.log(`calculateWinningResult () -> param grid: ${grid}`);
  const winningLines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
  ];

 for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      const winningResult = {
        value: grid[a], 
        winningLine: winningLines[i]
      }
      console.log("calculateWinningResult() -> winningResult: ", winningResult)
      return winningResult;
    }
  }
  console.log("No WinningResult yet");
  return null;
}

export default Game;