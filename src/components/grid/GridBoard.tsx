import Grid from "@mui/material/Grid";

import Square from "./Square";
import { GridBoardProps, isInteractiveGridBoardProps, WinningLine } from "../../types/types";

const GridBoard = (props: GridBoardProps) => {
  // extract shared props
  const { grid, disabled, invalidMove } = props;

  // normalize branch-specific props
  let OnPlayerMove: ((index: number) => void) | undefined;
  let winningLine: WinningLine | undefined;
  let latestMove: number | undefined;

  if (isInteractiveGridBoardProps(props)) {
    OnPlayerMove = props.OnPlayerMove;
    winningLine = props.winningLine;
  } else {
    latestMove = props.latestMove;
  }

  const className = !isInteractiveGridBoardProps(props)
    ? "move-history-gridboard"
    : "";

  return (
    <div className="board">
      <Grid
        container
        data-testid="game-grid"
        className={className}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          minWidth: "var(--board-width)",
          maxWidth: 300,
          margin: "0 auto"
        }}
      >
        {grid.map((value, i) => (
          <Square
            key={i}
            disabled={disabled}
            index={i}
            invalidMove={invalidMove}
            isLatestMove={latestMove === i}
            onSquareClick={() => OnPlayerMove?.(i)}
            value={value}
            winningLine={winningLine}
          />
        ))}
      </Grid>
    </div>
  );
};

export default GridBoard;