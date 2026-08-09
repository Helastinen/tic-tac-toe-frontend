import { calculateWinningResult } from "../../logic/gameLogic.js";
import { GameBoard, PlayerMark, TerminalStateDetectorProps } from "../../types/types.js";
import { getAvailableIndices } from "../../utils/utils.js";

/**
 * Chooses the optimal move for the AI (O) using the minimax algorithm.
 *
 * If the board has no empty squares, the game is over → return null.
 * Otherwise, delegate to bestMoveSelector to compute the strongest move.
 */
export const hardStrategy = (board: GameBoard) => {
  const availableIndices = getAvailableIndices(board);
  if (availableIndices.length === 0) return null;

  const bestMove = bestMoveSelector(board, availableIndices);
  return bestMove;
};

/**
 * Selects the best move for the AI (PlayerMark "O") by simulating every available move
 * and scoring each resulting board using minimax.
 *
 * The AI is a maximizing player, so it chooses the move that produces the highest minimax score.
 * The returned value is the actual board index (0–8) of the optimal move.
 */
const bestMoveSelector = (board: GameBoard, availableIndices: number[]) => {
  // AI (O) wants the highest possible score
  let bestScore = -Infinity;
  let bestMove = -1;

  // Evaluate every possible move
  for (let i = 0; i < availableIndices.length; i++) {
    const simulatedBoard = [...board];
    const index = availableIndices[i];

    // Simulate O making a move at this index
    simulatedBoard[index] = PlayerMark.O;

    // Score the resulting board using minimax
    const score = miniMax(
      simulatedBoard,
      getAvailableIndices(simulatedBoard),
      0,
      false
    );

    // Keep the move that yields the highest score
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    };
  }

  return bestMove;
};

/**
 * Minimax recursively evaluates all possible future game states and returns
 * a numeric score representing how good the position is for the AI (PlayerMark "O").
 *
 * Core ideas:
 * - Terminal states are scored immediately using boardEvaluator.
 * - On O's turn (maximizing), minimax chooses the highest score.
 * - On X's turn (minimizing), minimax chooses the lowest score.
 * - Each recursive call simulates one move, increases depth, and switches player.
 *
 * The returned bestScore represents the optimal outcome for the current player
 * assuming perfect play from both sides.
 */
const miniMax = (
  board: GameBoard,
  availableIndices: number[],
  depth: number,
  isMaximizingComputer: boolean
) => {
  // Check if the current board is a terminal state (win/loss/draw)
  const terminalState = terminalStateDetector(board);
  if (terminalState.isTerminal) return boardEvaluator(terminalState, depth);

  let bestScore = isMaximizingComputer ? -Infinity : Infinity;

  // Explore every possible move
  for (let i = 0; i < availableIndices.length; i++) {
    const simulatedBoard = [...board];
    const index = availableIndices[i];

    // Simulate the move for the current player
    simulatedBoard[index] = isMaximizingComputer ? PlayerMark.O : PlayerMark.X;

    // Recursively evaluate the resulting board
    const score = miniMax(
      simulatedBoard,
      getAvailableIndices(simulatedBoard),
      depth + 1,
      !isMaximizingComputer
    );

    if (isMaximizingComputer) {
      bestScore = Math.max(bestScore, score);
    } else {
      bestScore = Math.min(bestScore, score);
    }
  }

  return bestScore;
};

/**
 * Detects whether the current board is a terminal state for minimax.
 *
 * A board is terminal if:
 * - A player has won → terminal with a winner
 * - No empty squares remain → terminal draw
 * - Otherwise → game continues
 *
 * This allows minimax to stop recursion when the game is decided.
 */
const terminalStateDetector = (board: GameBoard) => {
  const availableIndices = getAvailableIndices(board);

  // Default: assume the game is still ongoing
  const terminalState: TerminalStateDetectorProps = {
    isTerminal: false,
    winner: null,
    isDraw: false
  };
  const winningResult = calculateWinningResult(board);

  // Check for a winner
  if (winningResult !== null) {
    return {
      ...terminalState,
      winner: winningResult?.cell,
      isTerminal: true
    };
  }

  // Check for a draw (no moves left and no winner)
  if (availableIndices.length === 0 && winningResult === null) {
    return {
      ...terminalState,
      isTerminal: true,
      isDraw: true
    };
  }

  // Otherwise game continues
  return terminalState;
};

/**
 * Scores a terminal board state for minimax.
 *
 * Minimax compares numeric scores, so this function converts the end-state into a number:
 * - AI win (O): positive score
 * - Human win (X): negative score
 * - Draw: zero
 *
 * Depth adjusts the score so the AI prefers faster wins and slower losses:
 * - Winning sooner → 10 - depth
 * - Losing later → -10 + depth
 */
const boardEvaluator = (terminalState: TerminalStateDetectorProps, depth: number) => {
  if (terminalState.winner === PlayerMark.O) return 10 - depth;
  else if (terminalState.winner === PlayerMark.X) return -10 + depth;
  else if (terminalState.isDraw) return 0;
  return 0;
};