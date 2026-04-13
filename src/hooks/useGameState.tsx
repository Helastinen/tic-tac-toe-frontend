import { useState } from "react";

import { calculateWinningResult } from "../logic/gameLogic.js";
import { isTieGame, togglePlayer } from "../utils/utils.js";

import {
  Cell,
  GameBoard,
  MoveHistoryType,
  PlayerMark,
  WinningResult
} from "../types/types.js";

export const useGameState = () => {
  const [moveHistory, setMoveHistory] = useState<MoveHistoryType>([Array(9).fill(null)]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>(PlayerMark.X);
  const [winningResult, setWinningResult] = useState<WinningResult>(null);
  // const [, setGameAborted] = useState(false);
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

  const playerMove = (index: number) => {
    const updatedBoard = [...currentBoard];

    // illegal move means a square already has a value, or game has already ended
    if ( updatedBoard[index] !== null || winningLine || !gameStarted ) {
      setInvalidMove(true);
      setTimeout(() => setInvalidMove(false), 500);
      return;
    }

    updatedBoard[index] = currentPlayer;

    const result = calculateWinningResult(updatedBoard);
    const winValue: Cell | undefined = result?.cell;
    const tieGame = isTieGame(winValue, updatedBoard);

    setCurrentPlayer(togglePlayer(currentPlayer));
    setMoveHistory([...moveHistory, updatedBoard]);
    setWinningResult(result);
    console.log("<Game> -> handlePlayerMove(): result", result);
    console.log("<Game> -> handlePlayerMove(): winValue", winValue);

    return { result, winValue, tieGame, updatedBoard };
  };

  return {
    // state
    moveHistory,
    currentPlayer,
    winningResult,
    gameStarted,
    invalidMove,
    // derived values
    currentBoard,
    winningValue,
    winningLine,
    // actions
    startGame,
    playerMove
  };
};