import { GameBoard } from "../types/types.js";

export const useComputerPlayer= () => {
  // Difficulty easy. Computer selects random free cell
  const getComputerMove = (board: GameBoard) => {
    let randomIndex: number | null = null;

    const availableIndices = board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null);
    console.log("<useComputerMove> -> available indices: ", availableIndices);

    randomIndex = Math.floor(Math.random() * availableIndices.length);
    console.log("<useComputerMove> -> random index: ", randomIndex);

    return availableIndices[randomIndex];
  };

  return { getComputerMove };
};