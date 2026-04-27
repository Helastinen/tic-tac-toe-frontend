import { GameBoard } from "../types/types.js";
import { randomInteger } from "../utils/utils.js";

export const useComputerPlayer= () => {
  // Difficulty easy. Computer selects random free cell
  const getComputerMove = (board: GameBoard) => {
    let randomIndex: number | null = null;

    const availableIndices = board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null);
    // console.log("<useComputerMove> -> available indices: ", availableIndices);

    randomIndex = randomInteger(0, availableIndices.length);
    // console.log("<useComputerMove> -> random index: ", randomIndex);

    return availableIndices[randomIndex];
  };

  return { getComputerMove };
};