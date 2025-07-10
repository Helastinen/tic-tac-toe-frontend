import Square from "./square";

const Grid = ({ winningLine, nextIsX, grid, onPlay }) => {
  /*console.log("<Grid> winningLine: ", winningLine);
  console.log("<Grid> nextIsX: ", nextIsX);
  console.log("<Grid> grid: ", grid);
  console.log("<Grid> onPlay: ", onPlay);*/

  const handleClick = (i) => {
    if (grid[i] || winningLine) return;
    
    const nextGrid = [...grid];
    nextIsX ? nextGrid[i] = "X" : nextGrid[i] = "O";
    onPlay(nextGrid, nextIsX);
  } 

  return (
    <>
      <div className="board-row">
        <Square 
          onSquareClick={() => handleClick(0)}
          index={0}
          value={grid[0]}
          winningLine={winningLine}
        />
        <Square
          onSquareClick={() => handleClick(1)}
          index={1}
          value={grid[1]}
          winningLine={winningLine}
        />
        <Square
          onSquareClick={() => handleClick(2)}
          index={2}
          value={grid[2]}
          winningLine={winningLine}
        />
      </div>
      <div className="board-row">
        <Square 
          onSquareClick={() => handleClick(3)}
          index={3}
          value={grid[3]}
          winningLine={winningLine}
        />
        <Square
          onSquareClick={() => handleClick(4)}
          index={4}
          value={grid[4]}
          winningLine={winningLine}
        />
        <Square
          onSquareClick={() => handleClick(5)}
          index={5}
          value={grid[5]}
          winningLine={winningLine}
        />
      </div>
      <div className="board-row">
        <Square 
          onSquareClick={() => handleClick(6)}
          index={6}
          value={grid[6]}
          winningLine={winningLine}
        />
        <Square
          onSquareClick={() => handleClick(7)}
          index={7}
          value={grid[7]}
          winningLine={winningLine}
        />
        <Square
          onSquareClick={() => handleClick(8)}
          index={8}
          value={grid[8]}
          winningLine={winningLine}
        />
      </div>
    </>
  )
}

export default Grid;