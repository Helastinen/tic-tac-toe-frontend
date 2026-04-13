import { useCallback, useState } from "react";
import { getGameStats, updateGameHistoryStats } from "../services/statsService.js";
import { GameHistoryStats, GameStats } from "../types/types.js";

export const useStats = () => {
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const fetchStats = useCallback(async (): Promise<void> => {
    try {
      const gameStats = await getGameStats();

      setGameStats(gameStats);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch stats: ", error);
      setError(`Failed to fetch stats: ${String(error)}`);
    }
  }, [setGameStats, setError]);

  const saveGameResult = useCallback(async (gameResult: GameHistoryStats) => {
    try {
      await updateGameHistoryStats(gameResult);
      const updatedStats = await getGameStats();

      setGameStats(updatedStats);
      setError(null);
    } catch (error) {
      console.error("Failed to persist stats: ", error);
      setError(`Failed to persist stats: ${String(error)}`);
    }
  }, [setGameStats, setError]);

  return { gameStats, error, clearError, fetchStats, saveGameResult };
};