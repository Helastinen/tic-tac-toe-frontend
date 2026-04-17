import { usePlayers } from "./usePlayers.js";
import { useStats } from "./useStats.js";
import { useGameState } from "./useGameState.js";
import {
  Cell,
  GameBoard,
  Players,
} from "../types/types.js";
import { calculateGameResults } from "../logic/gameLogic.js";

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
    playerMove
  } = useGameState();

  const handleStartGame = (playersInForm: Players) => {
    setPlayers(playersInForm);
    startGame();
  };

  const handlePlayerMove = (index: number) => {
    const result = playerMove(index);
    if (!result) return;

    const { result: winResult, winValue, tieGame, updatedBoard } = result;

    if (winResult || tieGame) {
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