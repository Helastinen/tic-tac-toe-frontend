import { GameBoard } from "../../types/types.js";
import { getAvailableIndices } from "../../utils/utils.js";

export const easyStrategy = (board: GameBoard) => {
  const availableIndices = getAvailableIndices(board);
  console.log("<easyStrategy> -> available indices: ", availableIndices);

  const randomIndex = Math.floor(Math.random() * availableIndices.length);
  console.log("<easyStrategy>  -> random index: ", randomIndex);
  return availableIndices[randomIndex];
};