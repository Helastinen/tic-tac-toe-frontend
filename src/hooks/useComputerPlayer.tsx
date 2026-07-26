import { calculateWinningResult } from "../logic/gameLogic.js";
import { Difficulty, GameBoard, PlayerMark } from "../types/types.js";

export const useComputerPlayer= () => {
  const getAvailableIndices = (board: GameBoard) =>
    board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null);

  const getEasyMove = (board: GameBoard) => {
    const availableIndices = getAvailableIndices(board);
    console.log("<useComputerPlayer> -> getEasyMove() -> available indices: ", availableIndices);

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    console.log("<useComputerPlayer> -> getEasyMove() -> random index: ", randomIndex);
    return availableIndices[randomIndex];
  };

  const getMediumMove = (board: GameBoard) => {
    const availableIndices = getAvailableIndices(board);
    console.log("<useComputerPlayer> -> getMediumMove() -> available indices: ", availableIndices);

    // try to win if computer already has two marks in a row
    for (const index of availableIndices) {
      const simulatedBoard = [...board];
      // computer always play with Mark O
      simulatedBoard[index] = PlayerMark.O;
      const result = calculateWinningResult(simulatedBoard);
      if (result?.cell === PlayerMark.O) {
        console.log("<useComputerPlayer> -> getMediumMove() -> Try to win -> chosen move: ", result);
        return index;
      }
    }

    // try to block if player already has two marks in a row
    for (const index of availableIndices) {
      const simulatedBoard = [...board];
      // human always play with Mark X
      simulatedBoard[index] = PlayerMark.X;
      const result = calculateWinningResult(simulatedBoard);
      if (result?.cell === PlayerMark.X) {
        console.log("<useComputerPlayer> -> getMediumMove() -> Try to block -> chosen move: ", result);
        return index;
      }
    }
    console.log("<useComputerPlayer> -> getMediumMove() -> random move selected.");
    // otherwise select random move
    return getEasyMove(board);
  };

  const getComputerMove = (board: GameBoard, difficulty: Difficulty ) => {
    switch (difficulty) {
    case Difficulty.easy:
      // Computer selects random free cell
      console.log("<useComputerPlayer> -> Difficulty level: easy move selected");
      return getEasyMove(board);
    case Difficulty.medium:
      console.log("<useComputerPlayer> -> Difficulty level: medium move selected");
      return getMediumMove(board);
    case Difficulty.hard:
      console.log("<useComputerPlayer> -> Difficulty level: hard move selected");
      return getMediumMove(board);
    default:
      return getEasyMove(board);
    }
  };

  return { getComputerMove };
};