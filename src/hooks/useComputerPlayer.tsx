import { calculateWinningResult } from "../logic/gameLogic.js";
import { Difficulty, GameBoard, PlayerMark } from "../types/types.js";

export const useComputerPlayer= () => {
  const getAvailableIndices = (board: GameBoard) =>
    board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null);

  const getEasyMove = (board: GameBoard) => {
    const availableIndices = getAvailableIndices(board);
    console.log("<useComputerMove> -> getEasyMove() -> available indices: ", availableIndices);

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    console.log("<useComputerMove> -> getEasyMove() -> random index: ", randomIndex);
    return availableIndices[randomIndex];
  };

  const getMediumMove = (board: GameBoard) => {
    const availableIndices = getAvailableIndices(board);

    // try to win if computer already has two marks in a row
    for (const index of availableIndices) {
      const simulatedBoard = [...board];
      // computer always play with Mark O
      simulatedBoard[index] = PlayerMark.O;
      const result = calculateWinningResult(simulatedBoard);
      if (result?.cell === PlayerMark.O) return index;
    }

    // try to block if player already has two marks in a row
    for (const index of availableIndices) {
      const simulatedBoard = [...board];
      // human always play with Mark X
      simulatedBoard[index] = PlayerMark.X;
      const result = calculateWinningResult(simulatedBoard);
      if (result?.cell === PlayerMark.X) return index;
    }

    // otherwise select random move
    return getEasyMove(board);
  };

  const getComputerMove = (board: GameBoard, difficulty: Difficulty ) => {
    switch (difficulty) {
    case Difficulty.easy:
      // Computer selects random free cell
      return getEasyMove(board);
    case Difficulty.medium:
      return getMediumMove(board);
    case Difficulty.hard:
      return getMediumMove(board);
    default:
      return getEasyMove(board);
    }
  };

  return { getComputerMove };
};