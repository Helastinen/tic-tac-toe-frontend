import { usePlayers } from "./usePlayers.js";
import { useStats } from "./useStats.js";
import { useGameState } from "./useGameState.js";
import {
  Cell,
  GameBoard,
  Players,
} from "../types/types.js";
import {
  applyMove,
  calculateGameResults,
  calculateWinningResult
} from "../logic/gameLogic.js";
import { isTieGame, togglePlayer } from "../utils/utils.js";

const useGameEngine = () => {
  const { players, setPlayers, getWinnerName } = usePlayers();
  const { gameStats, error, clearError, fetchStats, saveGameResult } = useStats();
  const {
    moveHistory,
    currentPlayer,
    winningResult,
    gameStarted,
    invalidMove,
    currentBoard,
    winningValue,
    winningLine,
    startGame,
    playerMove,
    setCurrentPlayer,
    setMoveHistory,
    setWinningResult,
    setGameStarted
  } = useGameState();

  const handleStartGame = (playersInForm: Players) => {
    setPlayers(playersInForm);
    startGame();
  };

  const handlePlayerMove = (index: number) => {
    const boardBeforeMove = playerMove(index);
    // disregard illegal moves
    if (!boardBeforeMove) return;

    const updatedBoard = applyMove(boardBeforeMove, index, currentPlayer);

    // calculate results
    const result = calculateWinningResult(updatedBoard);
    const winValue: Cell | undefined = result?.cell;
    const tieGame = isTieGame(winValue, updatedBoard);

    console.log("<useGameEngine> -> handlePlayerMove(): result", result);
    console.log("<useGameEngine> -> handlePlayerMove(): winValue", winValue);
    console.log("<useGameEngine> -> handlePlayerMove(): tieGame", tieGame);

    // update state
    setCurrentPlayer(togglePlayer(currentPlayer));
    setMoveHistory([...moveHistory, updatedBoard]);
    setWinningResult(result);

    if (result || tieGame) {
      void handleEndGame(winValue, updatedBoard);
    }
  };

  const handleEndGame = async (
    winValue: Cell | undefined = undefined,
    board: GameBoard = [],
    aborted = false
  ) => {
    const gameResult = calculateGameResults(
      winValue,
      board,
      aborted,
      getWinnerName,
      players
    );

    await saveGameResult(gameResult);

    setGameStarted(false);
  };

  return {
    moveHistory,
    currentPlayer,
    players,
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
    handlePlayerMove,
    handleEndGame,
    setPlayers,
    fetchStats,
  };
};

export default useGameEngine;