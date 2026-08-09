import { calculateWinningResult } from "../../logic/gameLogic.js";
import { GameBoard, PlayerMark } from "../../types/types.js";
import { getAvailableIndices } from "../../utils/utils.js";
import { easyStrategy } from "./easyStrategy.js";

export const mediumStrategy = (board: GameBoard) => {
  const availableIndices = getAvailableIndices(board);
  console.log("<mediumStrategy> available indices: ", availableIndices);

  // try to win if computer already has two marks in a row
  for (const index of availableIndices) {
    const simulatedBoard = [...board];
    // computer always play with Mark O
    simulatedBoard[index] = PlayerMark.O;
    const result = calculateWinningResult(simulatedBoard);
    if (result?.cell === PlayerMark.O) {
      console.log("<mediumStrategy> Try to win -> chosen move: ", result);
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
      console.log("<mediumStrategy> Try to block -> chosen move: ", result);
      return index;
    }
  }
  console.log("<mediumStrategy> random move selected.");
  // otherwise select random move
  return easyStrategy(board);
};