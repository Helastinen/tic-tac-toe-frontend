import {
  Cell,
  GameBoard,
  GameStatus,
  Players,
  WinningLines,
  WinningResult
} from "../types/types.js";
import { isComputerVictory } from "../utils/utils.js";

/**
 * Applies a player's move to the board by returning a new board
 * with the specified index updated to the given player mark.
 * @param {GameBoard} board - The current game board state.
 * @param {number} index - The board position where the move is applied.
 * @param {Cell} player - The player mark to place at the given index.
 * @returns {GameBoard} A new board array with the updated move applied.
 */
export const applyMove = ( board: GameBoard,  index: number,  player: Cell ): GameBoard => {
  const updatedBoard = [...board];
  updatedBoard[index] = player;
  return updatedBoard;
};

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

/**
 * Builds the final game result object based on the board state and outcome.
 * @param winValue - The winning player's mark ("X", "O") or undefined, if the game ended in a tie.
 * @param board - The final game board as an array of 9 cells.
 * @param aborted - Whether the game was aborted before completion.
 * @param getWinnerName - A function that resolves the winner's display name based on the winning mark.
 * @param players - The player names used during the game.
 * @isSinglePlayerGame - Was the game played against the computer
 * @returns An object describing the completed game's outcome.
 */
export const calculateGameResults = (
  winValue: Cell | undefined = undefined,
  board: GameBoard,
  aborted = false,
  getWinnerName: (winValue?: Cell) => string | undefined,
  players: Players,
  isSinglePlayerGame: boolean
) => {
  const playedMoves = board?.filter(square => square !== null).length ?? 0;
  const status = getGameStatus(aborted, winValue);
  const gameLengthInMoves = getGameLengthInMoves(aborted, playedMoves);
  const winnerName = getWinnerName(winValue);

  const computerWon = isSinglePlayerGame
    ? isComputerVictory(isSinglePlayerGame, winValue)
    : undefined;

  const gameResult = {
    playerOne: players.playerOne,
    playerTwo: players.playerTwo,
    winnerName,
    winningMark: winValue,
    gameLengthInMoves,
    status,
    isSinglePlayerGame,
    computerWon
  };

  return gameResult;
};

const getGameStatus = (aborted: boolean, winValue?: Cell): GameStatus => {
  if (aborted) return GameStatus.Aborted;
  if (winValue) return GameStatus.CompletedWinner;
  return GameStatus.CompletedTie;
};

const getGameLengthInMoves = (aborted: boolean, playedMoves: number): number | undefined => {
  return aborted ? undefined : playedMoves;
};