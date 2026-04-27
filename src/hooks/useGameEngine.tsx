import { usePlayers } from "./usePlayers.js";
import { useStats } from "./useStats.js";
import { useGameState } from "./useGameState.js";
import {
  Cell,
  GameBoard,
  PlayerMark,
  Players,
} from "../types/types.js";
import {
  applyMove,
  calculateGameResults,
  calculateWinningResult
} from "../logic/gameLogic.js";
import { isTieGame, randomInteger, togglePlayer } from "../utils/utils.js";
import { useComputerPlayer } from "./useComputerPlayer.js";
import { COMPUTER_THINKING_TIME_MAX_SEC, COMPUTER_THINKING_TIME_MIN_SEC, COMPUTERMARK } from "../constants/config.js";

const useGameEngine = () => {
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
    setCurrentPlayer,
    setMoveHistory,
    setWinningResult,
    setGameStarted
  } = useGameState();
  const { getComputerMove } = useComputerPlayer();

  const handleStartGame = (playersInForm: Players) => {
    setPlayers(playersInForm);
    startGame();
  };

  const handleHumanMove = (index: number) => {
    console.log("<useGameEngine> -> handleHumanMove() triggered with index: ", index);

    const boardBeforeMove = playerMove(index);
    // disregard illegal moves
    if (!boardBeforeMove) return;

    processMove(boardBeforeMove, index, currentPlayer);
  };

  const handleComputerMove = (board: GameBoard) => {
    console.log("<useGameEngine> -> handleComputerMove() triggered with board: ", board);
    const index: number = getComputerMove(board);
    processMove(board, index, COMPUTERMARK);
  };

  const processMove = (board: GameBoard, index: number, player: PlayerMark) => {
    const updatedBoard = applyMove(board, index, player);

    // calculate results
    const result = calculateWinningResult(updatedBoard);
    const winValue: Cell | undefined = result?.cell;
    const tieGame = isTieGame(winValue, updatedBoard);

    // console.log("<useGameEngine> -> handlePlayerMove() -> result: ", result);
    // console.log("<useGameEngine> -> handlePlayerMove() -> winValue: ", winValue);
    // console.log("<useGameEngine> -> handlePlayerMove() -> tieGame: ", tieGame);

    const nextPlayer: PlayerMark = togglePlayer(player);

    // update state
    setCurrentPlayer(nextPlayer);
    setMoveHistory([...moveHistory, updatedBoard]);
    setWinningResult(result);

    if (result || tieGame) {
      void handleEndGame(winValue, updatedBoard);
      // computer shouldn't make moves after game has ended
      return;
    }

    if (isSinglePlayerGame && nextPlayer === COMPUTERMARK) {
      console.log("<useGameEngine> -> processMove() -> computer move triggered, nextPlayer: ", nextPlayer);
      const delay = randomInteger(
        COMPUTER_THINKING_TIME_MIN_SEC,
        COMPUTER_THINKING_TIME_MAX_SEC
      ) * 1000;

      setTimeout(() => handleComputerMove(updatedBoard), delay);
    };
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
    handleHumanMove,
    handleEndGame,
    setPlayers,
    fetchStats,
  };
};

export default useGameEngine;