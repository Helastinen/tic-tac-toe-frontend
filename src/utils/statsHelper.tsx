import { UI_TEXT } from "../constants/uiText.js";
import { GameHistoryStats, GameStats, GameStatus, StatsListItem, TotalStats } from "../types/types.js";

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

export const buildStats = (totalStats: TotalStats, gameHistory: GameHistoryStats[]) => {
  const { allGames, soloGames, twoPlayerGames } = totalStats;

  const {
    totalGames,
    wins: allGameWins,
    ties: allGameTies,
    aborted: allGameAborted,
  } = allGames;

  const {
    totalSoloGames,
    humanWins,
    computerWins,
    ties: soloTies,
    aborted: soloAborted,
  } = soloGames;

  const {
    totalTwoPlayerGames,
    playerOneWins,
    playerTwoWins,
    ties: twoPlayerTies,
    aborted: twoPlayerAborted,
  } = twoPlayerGames;

  const allGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalGames },
    { name: UI_TEXT.STATS.WINS, value: allGameWins, percentage: getStatPercentage(allGameWins, totalGames) },
    { name: UI_TEXT.STATS.TIES, value: allGameTies, percentage: getStatPercentage(allGameTies, totalGames) },
    { name: UI_TEXT.STATS.ABORTED, value: allGameAborted, percentage: getStatPercentage(allGameAborted, totalGames) },
    { name: UI_TEXT.STATS.AVERAGE_ROUND, value: calculateAverageRoundWin(gameHistory) ?? UI_TEXT.STATS.NOT_APPLICABLE },
  ];

  const soloGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalSoloGames },
    { name: UI_TEXT.STATS.HUMAN_WINS, value: humanWins, percentage: getStatPercentage(humanWins, totalSoloGames) },
    { name: UI_TEXT.STATS.COMPUTER_WINS, value: computerWins, percentage: getStatPercentage(computerWins, totalSoloGames) },
    { name: UI_TEXT.STATS.TIES, value: soloTies, percentage: getStatPercentage(soloTies, totalSoloGames) },
    { name: UI_TEXT.STATS.ABORTED, value: soloAborted, percentage: getStatPercentage(soloAborted, totalSoloGames) },
  ];

  const twoPlayerGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalTwoPlayerGames },
    { name: UI_TEXT.STATS.X_WINS, value: playerOneWins, percentage: getStatPercentage(playerOneWins, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.O_WINS, value: playerTwoWins, percentage: getStatPercentage(playerTwoWins, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.TIES, value: twoPlayerTies, percentage: getStatPercentage(twoPlayerTies, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.ABORTED, value: twoPlayerAborted, percentage: getStatPercentage(twoPlayerAborted, totalTwoPlayerGames) },
  ];

  return {
    allGameStats,
    soloGameStats,
    twoPlayerGameStats
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