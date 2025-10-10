import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import GridBoard from "./GridBoard";
import { GameBoard, PlayerMark, WinningLine } from "../types/types";

const mockGrid: GameBoard = Array(9).fill(null);
const mockMove = vi.fn();

const createGridBoard = ({
  disabled = false,
  mode = "interactive",
  winningLine = undefined,
  nextPlayer = PlayerMark.X,
  grid = mockGrid,
  OnPlayerMove = mockMove,
} : {
  grid?: GameBoard;
  disabled?: boolean;
  nextPlayer?: PlayerMark;
  OnPlayerMove?: (nextGrid: GameBoard, nextPlayer: PlayerMark) => void;
  winningLine?: WinningLine | undefined;
  mode?: "interactive" | "moveHistory";
} = {} ) => {
  if (mode = "interactive") {
    return (
      <GridBoard  
        disabled={disabled}
        mode="interactive"
        winningLine={winningLine}
        nextPlayer={nextPlayer}
        grid={grid}
        OnPlayerMove={OnPlayerMove}
      />
    );
  }

  return ( <GridBoard  
      disabled={true}
      mode="moveHistory"      
      grid={grid}
    />
  )
};

describe("GridBoard", () => {
  beforeEach(() => {
    mockMove.mockReset();
  });

  test("renders component", () => {
    const mockGridBoard = createGridBoard();
    const { container } = render(mockGridBoard);

    expect(container).toBeTruthy();
  });
  
  test("renders squares", () => {
    const mockGridBoard = createGridBoard();
    render(mockGridBoard);

    const grid = screen.getByTestId("game-grid");

    expect(grid).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(9);
  });

  test("clicking empty square triggers PlayerMove", () => {
    const mockGridBoard = createGridBoard();
    render(mockGridBoard);

    const squareButtons = screen.getAllByRole("button");
    squareButtons[0].click();

    expect(mockMove).toHaveBeenCalledTimes(1);
    expect(mockMove).toHaveBeenCalledWith(expect.any(Array), PlayerMark.X);
  });

  test("clicking a filled square does nothing", () => {
    const filledGrid = [...mockGrid]; 
    filledGrid[0] = PlayerMark.X;

    const mockGridBoard = createGridBoard({ grid: filledGrid });
    render(mockGridBoard);
 
    const squareButtons = screen.getAllByRole("button");
    squareButtons[0].click();

    expect(mockMove).not.toHaveBeenCalled();
  });
})