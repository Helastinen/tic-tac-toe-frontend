import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import Game from "./Game.js";
import { UI_TEXT } from "./constants/uiText.js";
import axios from "axios";
import { mockGameHistoryStats, mockTotalStats } from "./constants/testingMocks.js";

vi.mock("axios");

describe("Game", () => {
  beforeEach(() => {
    // need to mock each endpoint separately, since gamehistory is array and totalStats is object
    (axios.get as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes("/gameHistory")) {
        return Promise.resolve({ data: mockGameHistoryStats });
      }
      if (url.includes("/totalStats")) {
        return Promise.resolve({ data: mockTotalStats });
      }
      return Promise.resolve({ data: {} });
    });
  });

  test("renders component", async() => {
    const { container } = render(<Game />);

    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  test("renders game elements", async() => {
    render(<Game />);

    await waitFor(() => {
      const gameTitle = screen.getByText(UI_TEXT.GAME.TITLE);
      const singlePlayerGameButton = screen.getByText(UI_TEXT.GAME.SINGLE_PLAYER);
      const twoPlayerGameButton = screen.getByText(UI_TEXT.GAME.TWO_PLAYERS);
      const statsButton = screen.getByText(UI_TEXT.GAME.STATS);
      const grid = screen.getByTestId("game-grid");

      expect(gameTitle).toBeInTheDocument();
      expect(singlePlayerGameButton).toBeInTheDocument();
      expect(twoPlayerGameButton).toBeInTheDocument();
      expect(statsButton).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
    });
  });
});