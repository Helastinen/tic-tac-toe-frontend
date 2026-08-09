import { usePlayers } from "./usePlayers.js";
import { useStats } from "./useStats.js";
import { useGameState } from "./useGameState.js";
import {
  Cell,
  Difficulty,
  GameBoard,
  PlayerMark,
} from "../types/types.js";
import {
  applyMove,
  calculateGameResults,
  calculateWinningResult
} from "../logic/gameLogic.js";
import { isTieGame, randomInteger, togglePlayer } from "../utils/utils.js";
import { useComputerPlayer } from "./ai/useComputerPlayer.js";
import { COMPUTER_THINKING_TIME_MAX_SEC, COMPUTER_THINKING_TIME_MIN_SEC, COMPUTERMARK } from "../constants/config.js";
import { useRef, useState } from "react";

const useGameEngine = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.easy);
  //console.log("<UseGameEngine> -> difficulty level is: ", difficulty);

  const { players, setPlayers, getWinnerName } = usePlayers();
  const { gameStats, error, clearError, fetchStats, saveGameResult } = useStats();
  const {
    moveHistory,
    isSinglePlayerGame,
    currentPlayer,
    winningResult,
    gameStarted,
    invalidMove,
    currentBoard,
    winningValue,
    winningLine,
    startGame,
    playerMove,
    resetGameState,
    setCurrentPlayer,
    setIsSinglePlayerGame,
    setMoveHistory,
    setWinningResult,
    setGameStarted
  } = useGameState();
  const { getComputerMove } = useComputerPlayer();

  const computerMoveTimeout = useRef<number |null>(null);
  const isComputerTurn = isSinglePlayerGame && currentPlayer === COMPUTERMARK;

  const handleStartGame = () => startGame();

  const handleHumanMove = (index: number) => {
    //console.log("<useGameEngine> -> handleHumanMove() triggered with index: ", index);

    const boardBeforeMove = playerMove(index);
    // disregard illegal moves
    if (!boardBeforeMove) return;

    processMove(boardBeforeMove, index, currentPlayer);
  };

  const handleComputerMove = (board: GameBoard) => {
    //console.log("<useGameEngine> -> handleComputerMove() triggered with board: ", board);
    const index: number = getComputerMove(board, difficulty);
    processMove(board, index, COMPUTERMARK);
  };

  const processMove = (board: GameBoard, index: number, player: PlayerMark) => {
    //console.log("<useGameEngine> -> processMove() -> board: ", board);
    //console.log("<useGameEngine> -> processMove() -> index: ", index);
    //console.log("<useGameEngine> -> processMove() -> player: ", player);
    const updatedBoard = applyMove(board, index, player);
    //console.log("<useGameEngine> -> processMove() -> updatedBoard: ", updatedBoard);

    // calculate results
    const result = calculateWinningResult(updatedBoard);
    const winValue: Cell | undefined = result?.cell;
    const tieGame = isTieGame(winValue, updatedBoard);

    // console.log("<useGameEngine> -> processMove() -> result: ", result);
    // console.log("<useGameEngine> -> processMove() -> winValue: ", winValue);
    // console.log("<useGameEngine> -> processMove() -> tieGame: ", tieGame);

    const nextPlayer: PlayerMark = togglePlayer(player);
    const IsNextPlayerComputer = isSinglePlayerGame && nextPlayer === COMPUTERMARK;
    //console.log("<useGameEngine> -> processMove() -> nextPlayer: ", nextPlayer);

    // update state
    setCurrentPlayer(nextPlayer);
    //console.log("<useGameEngine> -> processMove() -> moveHistory: ", moveHistory);
    setMoveHistory(prev => [...prev, updatedBoard]);
    setWinningResult(result);

    if (result || tieGame) {
      void handleEndGame(winValue, updatedBoard);
      // computer shouldn't make moves after game has ended
      return;
    }

    if (IsNextPlayerComputer) {
      //console.log("<useGameEngine> -> processMove() -> computer move triggered, nextPlayer: ", nextPlayer);

      const ComputerThinkingDelay = randomInteger(
        COMPUTER_THINKING_TIME_MIN_SEC,
        COMPUTER_THINKING_TIME_MAX_SEC
      ) * 1000;

      computerMoveTimeout.current = window.setTimeout(() => {
        handleComputerMove(updatedBoard);
      }, ComputerThinkingDelay);
    };
  };

  const handleEndGame = async (
    winValue: Cell | undefined = undefined,
    board: GameBoard = [],
    aborted = false
  ) => {
    //console.log("<useGameEngine> -> handleEndGame() -> triggered");
    //console.log("<useGameEngine> -> handleEndGame() ->winValue: ", winValue);
    //console.log("<useGameEngine> -> handleEndGame() -> board: ", board);
    //console.log("<useGameEngine> -> handleEndGame() -> aborted: ", aborted);
    const gameResult = calculateGameResults(
      winValue,
      board,
      aborted,
      getWinnerName,
      players,
      isSinglePlayerGame,
    );

    await saveGameResult(gameResult);

    setGameStarted(false);
  };

  const handleAbortGame = (board: GameBoard) => {
    // Cancel pending computer move
    if (computerMoveTimeout.current !== null) {
      clearTimeout(computerMoveTimeout.current);
      computerMoveTimeout.current = null;
    }

    handleEndGame(undefined, board, true);
    resetGameState();
  };

  const setIsSinglePlayer = (singlePlayer: boolean) => {
    setIsSinglePlayerGame(singlePlayer);
  };

  return {
    moveHistory,
    isSinglePlayerGame,
    isComputerTurn,
    currentPlayer,
    players,
    difficulty,
    winningResult,
    gameStarted,
    gameStats,
    currentBoard,
    winningValue,
    winningLine,
    error,
    invalidMove,
    clearError,
    handleStartGame,
    handleHumanMove,
    handleEndGame,
    handleAbortGame,
    setPlayers,
    fetchStats,
    setIsSinglePlayer,
    setDifficulty
  };
};

export default useGameEngine;