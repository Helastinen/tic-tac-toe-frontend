import { GameStats } from "../types/types";

export const defaultStats: GameStats = {
  playerOneWins: 0,
  playerTwoWins: 0,
  ties: 0,
  aborted: 0,
};

export const getSafeStats = (stats: GameStats | null): GameStats => {
  return stats ?? defaultStats
};