import { GameBoard,  WinningLines, WinningResult } from "../types/types";

/**
 * Determines if the current grid contains a winning line.
 * @param grid - The current game board as an array of 9 cells.
 * @returns The winning result if found, otherwise null.
 */
export const calculateWinningResult = (grid: GameBoard) => {
  const winningLines: WinningLines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;

    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      const winningResult: WinningResult = {
        cell: grid[a],
        winningLine: line
      };
      return winningResult;
    }
  }

  return null;
};
