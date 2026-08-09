import { describe, expect, Mocked, test } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";

import axios from "axios";

import useGameEngine from "./useGameEngine.js";
import { GameBoard, PlayerMark } from "../types/types.js";
import { mockEmptyGrid, mockEmptyMoveHistory, mockTotalStats, mockPlayers, mockGameHistoryStats } from "../constants/testingMocks.js";
import { CONFIG } from "../constants/config.js";

vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

describe("useGameEngine", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockTotalStats });
  });

  test("initial state is correct", async () => {
    const { result } = renderHook(() => useGameEngine());

    await waitFor(() => {
      expect(result.current).toMatchObject({
        moveHistory: mockEmptyMoveHistory,
        currentPlayer: PlayerMark.X,
        players: mockPlayers,
        gameStarted: false,
        winningResult: null,
      });
    });
  });

  test("handleHumanMove updates grid and toggles player", async () => {
    const { result } = renderHook(() => useGameEngine());
    const currentBoard: GameBoard = [
      PlayerMark.X, null, null,
      null, null, null,
      null, null, null
    ];
    act(() => result.current.handleStartGame());
    act(() => result.current.handleHumanMove(0));

    await waitFor(() => {
      expect(result.current).toMatchObject({
        moveHistory: [mockEmptyGrid, currentBoard],
        currentPlayer: PlayerMark.O,
        players: mockPlayers,
        gameStarted: true,
        winningResult: null,
      });
    });
  });

  test("handleEndGame updates stats and ends game in two player game", async () => {
    const { result } = renderHook(() => useGameEngine());
    const board: GameBoard = [
      PlayerMark.X, PlayerMark.X, PlayerMark.X,
      PlayerMark.O, PlayerMark.O, null,
      null, null, null
    ];

    mockedAxios.post.mockResolvedValue({});

    // singlePlayer is set to true by default
    act(() => result.current.setIsSinglePlayer(false));
    await act(() => result.current.handleEndGame(PlayerMark.X, board));

    expect(result.current.gameStarted).toBe(false);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining(`${CONFIG.API_BASE_URL}/${CONFIG.API_GAMEHISTORY}`),
      expect.objectContaining(mockGameHistoryStats[0])
    );
  });
});