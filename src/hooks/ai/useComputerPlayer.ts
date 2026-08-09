import { Difficulty, GameBoard } from "../../types/types.js";
import { easyStrategy } from "./easyStrategy.js";
import { hardStrategy } from "./hardStrategy.js";
import { mediumStrategy } from "./mediumStrategy.js";

export const useComputerPlayer= () => {

  const getComputerMove = (board: GameBoard, difficulty: Difficulty ) => {
    switch (difficulty) {
    case Difficulty.easy:
      // Computer selects random free cell
      console.log("<useComputerPlayer> -> Difficulty level: easy move selected");
      return easyStrategy(board);
    case Difficulty.medium:
      console.log("<useComputerPlayer> -> Difficulty level: medium move selected");
      return mediumStrategy(board);
    case Difficulty.hard:
      console.log("<useComputerPlayer> -> Difficulty level: hard move selected");
      return hardStrategy(board);
    default:
      return easyStrategy(board);
    }
  };

  return { getComputerMove };
};