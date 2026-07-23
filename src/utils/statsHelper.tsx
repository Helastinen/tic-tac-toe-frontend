import { UI_TEXT } from "../constants/uiText.js";
import { GameStats, StatsListItem, TotalStats } from "../types/types.js";

export const defaultGameStats: GameStats = {
  gameHistory: [],
  totalStats: {
    allGames: {
      totalGames: 0,
      wins: 0,
      ties: 0,
      aborted: 0,
      averageGameLength: 0
    },
    soloGames: {
      totalSoloGames: 0,
      humanWins: 0,
      computerWins: 0,
      ties: 0,
      aborted: 0,
      averageGameLength: 0
    },
    twoPlayerGames: {
      totalTwoPlayerGames: 0,
      playerOneWins: 0,
      playerTwoWins: 0,
      ties: 0,
      aborted: 0,
      averageGameLength: 0
    }
  }
};

export const getSafeStats = (gameStats: GameStats | null): GameStats => {
  return {
    gameHistory: gameStats?.gameHistory ?? defaultGameStats.gameHistory,
    totalStats: gameStats?.totalStats ?? defaultGameStats.totalStats
  };
};

export const buildStats = (totalStats: TotalStats) => {
  const { allGames, soloGames, twoPlayerGames } = totalStats;

  const {
    totalGames,
    wins: allGameWins,
    ties: allGameTies,
    aborted: allGameAborted,
    averageGameLength: avgAllGamesLength
  } = allGames;

  const {
    totalSoloGames,
    humanWins,
    computerWins,
    ties: soloTies,
    aborted: soloAborted,
    averageGameLength: avgSoloGamesLength
  } = soloGames;

  const {
    totalTwoPlayerGames,
    playerOneWins,
    playerTwoWins,
    ties: twoPlayerTies,
    aborted: twoPlayerAborted,
    averageGameLength: avgTwoPlayerGamesLength
  } = twoPlayerGames;

  const allGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalGames },
    { name: UI_TEXT.STATS.WINS, value: allGameWins, percentage: getStatPercentage(allGameWins, totalGames) },
    { name: UI_TEXT.STATS.TIES, value: allGameTies, percentage: getStatPercentage(allGameTies, totalGames) },
    { name: UI_TEXT.STATS.ABORTED, value: allGameAborted, percentage: getStatPercentage(allGameAborted, totalGames) },
    { name: UI_TEXT.STATS.AVERAGE_ROUND, value: avgAllGamesLength ?? UI_TEXT.STATS.NOT_APPLICABLE },
  ];

  const soloGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalSoloGames },
    { name: UI_TEXT.STATS.HUMAN_WINS, value: humanWins, percentage: getStatPercentage(humanWins, totalSoloGames) },
    { name: UI_TEXT.STATS.COMPUTER_WINS, value: computerWins, percentage: getStatPercentage(computerWins, totalSoloGames) },
    { name: UI_TEXT.STATS.TIES, value: soloTies, percentage: getStatPercentage(soloTies, totalSoloGames) },
    { name: UI_TEXT.STATS.ABORTED, value: soloAborted, percentage: getStatPercentage(soloAborted, totalSoloGames) },
    { name: UI_TEXT.STATS.AVERAGE_ROUND, value: avgSoloGamesLength ?? UI_TEXT.STATS.NOT_APPLICABLE },
  ];

  const twoPlayerGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalTwoPlayerGames },
    { name: UI_TEXT.STATS.X_WINS, value: playerOneWins, percentage: getStatPercentage(playerOneWins, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.O_WINS, value: playerTwoWins, percentage: getStatPercentage(playerTwoWins, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.TIES, value: twoPlayerTies, percentage: getStatPercentage(twoPlayerTies, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.ABORTED, value: twoPlayerAborted, percentage: getStatPercentage(twoPlayerAborted, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.AVERAGE_ROUND, value: avgTwoPlayerGamesLength ?? UI_TEXT.STATS.NOT_APPLICABLE },
  ];

  return {
    allGameStats,
    soloGameStats,
    twoPlayerGameStats
  };
};

export const getStatPercentage = (stat: number, total: number) => {
  if (total === 0) return 0;
  return roundToDecimals(stat / total * 100, 0);
};

const roundToDecimals = (number: number, decimals: number): number => {
  const factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
};