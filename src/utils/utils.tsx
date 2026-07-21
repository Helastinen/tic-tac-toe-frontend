import { COMPUTERMARK } from "../constants/config.js";
import { Cell, GameBoard, PlayerMark } from "../types/types.js";

export const isTieGame = (winningValue: Cell | undefined, grid: GameBoard) => !winningValue && grid.every(item => item !== null);

export const isComputerVictory = (isSinglePlayerGame: boolean, winningMark: Cell | undefined) =>
  isSinglePlayerGame && winningMark === COMPUTERMARK;

export const togglePlayer = (currentPlayer: PlayerMark) =>
  currentPlayer === PlayerMark.X ? PlayerMark.O : PlayerMark.X;

export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};