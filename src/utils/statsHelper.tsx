import { GameHistoryStats, GameStats, GameStatus } from "../types/types.js";

export const defaultGameStats: GameStats = {
  gameHistory: [],
  totalStats: {
    allGames: {
      totalGames: 0,
      wins: 0,
      ties: 0,
      aborted: 0
    },
    soloGames: {
      totalSoloGames: 0,
      humanWins: 0,
      computerWins: 0,
      ties: 0,
      aborted: 0,
    },
    twoPlayerGames: {
      totalTwoPlayerGames: 0,
      playerOneWins: 0,
      playerTwoWins: 0,
      ties: 0,
      aborted: 0,
    }
  }
};

export const getSafeStats = (gameStats: GameStats | null): GameStats => {
  return {
    gameHistory: gameStats?.gameHistory ?? defaultGameStats.gameHistory,
    totalStats: gameStats?.totalStats ?? defaultGameStats.totalStats
  };
};

export const calculateAverageRoundWin = (gameHistory: GameHistoryStats[]): number | null => {
  if (!gameHistory?.length) return null;

  const completedGamesWithWinningMove = gameHistory.filter(
    game => game.status === GameStatus.CompletedWinner && game.winningMove
  );

  if (completedGamesWithWinningMove.length === 0) return null;

  const averageRoundWin = completedGamesWithWinningMove.reduce((sum, game) =>
    sum + (game.winningMove ?? 0), 0) /
    completedGamesWithWinningMove.length;

  // round up to nearest two decimals
  return roundToDecimals(averageRoundWin, 1);
};

export const getStatPercentage = (stat: number, total: number) => {
  if (total === 0) return 0;
  return roundToDecimals(stat / total * 100, 0);
};

const roundToDecimals = (number: number, decimals: number): number => {
  const factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
};