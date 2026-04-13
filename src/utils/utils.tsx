import { Cell, GameBoard, PlayerMark } from "../types/types.js";

export const isTieGame = (winningValue: Cell | undefined, grid: GameBoard) => !winningValue && grid.every(item => item !== null);

export const togglePlayer = (currentPlayer: PlayerMark) =>
  currentPlayer === PlayerMark.X ? PlayerMark.O : PlayerMark.X;