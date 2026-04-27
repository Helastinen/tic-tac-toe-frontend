import { useState } from "react";
import {
  Cell,
  GameBoard,
  MoveHistoryType,
  PlayerMark,
  WinningResult
} from "../types/types.js";

export const useGameState = () => {
  const [moveHistory, setMoveHistory] = useState<MoveHistoryType>([Array(9).fill(null)]);
  const [isSinglePlayerGame, setIsSinglePlayerGame] = useState<boolean>(true);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>(PlayerMark.X);
  const [winningResult, setWinningResult] = useState<WinningResult>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [invalidMove, setInvalidMove] = useState<boolean>(false);

  const currentBoard: GameBoard = moveHistory[moveHistory.length - 1];
  const winningValue: Cell | undefined = winningResult?.cell;
  const winningLine = winningResult?.winningLine;

  const startGame = () => {
    setWinningResult(null);
    setCurrentPlayer(PlayerMark.X);
    setMoveHistory([Array(9).fill(null)]);
    setGameStarted(true);
  };

  const playerMove = (index: number): GameBoard | null => {
    const boardCopy = [...currentBoard];
    // Illegal move means a square already has a value or the game has already ended
    const illegalMove = boardCopy[index] !== null || winningLine || !gameStarted;

    if (illegalMove) {
      setInvalidMove(true);
      setTimeout(() => setInvalidMove(false), 500);
      // console.log("<useGameState> -> playerMove(): illegalMove", illegalMove);
      return null;
    }

    return boardCopy;
  };

  return {
    // state
    moveHistory,
    isSinglePlayerGame,
    currentPlayer,
    winningResult,
    gameStarted,
    invalidMove,
    // derived values
    currentBoard,
    winningValue,
    winningLine,
    // actions
    setMoveHistory,
    setIsSinglePlayerGame,
    setCurrentPlayer,
    setWinningResult,
    setGameStarted,
    startGame,
    playerMove,
  };
};