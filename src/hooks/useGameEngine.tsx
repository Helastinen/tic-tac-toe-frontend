import { usePlayers } from "./usePlayers";
import { useStats } from "./useStats";
import { useGameState } from "./useGameState";
import {
  Cell,
  GameBoard,
  GameStatus,
  Players,
} from "../types/types";

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
    aborted = false,
  ) => {
    // calculate gameResult
    const playedMoves = board?.filter(square => square !== null).length ?? 0;
    const status = getGameStatus(aborted, winValue);
    const winningMove = getWinningMove(aborted, status, playedMoves);
    const winnerName = getWinnerName(winValue);
    const gameResult = {
      playerOne: players?.playerOne,
      playerTwo: players?.playerTwo,
      winnerName,
      winningMark: winValue,
      winningMove,
      status,
    };

    await saveGameResult(gameResult);
  };

  const getGameStatus = (aborted: boolean, winValue?: Cell): GameStatus => {
    if (aborted) return GameStatus.Aborted;
    if (winValue) return GameStatus.CompletedWinner;
    return GameStatus.CompletedTie;
  };

  const getWinningMove = (
    aborted: boolean,
    status: GameStatus,
    playedMoves: number
  ): number | undefined => {
    if (aborted || status === GameStatus.CompletedTie) return undefined;
    return playedMoves;
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