import React from "react";

//* Enums
export enum PlayerMark {
  X = "X",
  O = "O"
};
export enum GameStatus {
  Aborted = "aborted",
  CompletedWinner = "completed_with_winner",
  CompletedTie = "completed_with_tie"
};

export enum GridBoardType {
  Interactive = "interactive",
  MoveHistory = "moveHistory"
};

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

//* Grid
export type Cell = Nullable<PlayerMark>;
export type GameBoard = Cell[];
export type MoveHistoryType = Cell[][];

export type WinningLine = number[];
export type WinningLines = number[][];
export type WinningResult = null | {
  cell: Cell;
  winningLine: WinningLine;
};
export type Players = null | {
  playerOne: string;
  playerTwo: string;
};

//* Stats
export interface AllGameStats {
  totalGames: number;
  wins: number;
  ties: number;
  aborted: number;
  averageGameLength: number;
}

export interface SoloGameStats {
  totalSoloGames: number;
  humanWins: number;
  computerWins: number;
  ties: number;
  aborted: number;
  averageGameLength: number;
}

export interface TwoPlayerGameStats {
  totalTwoPlayerGames: number;
  playerOneWins: number;
  playerTwoWins: number;
  ties: number;
  aborted: number;
  averageGameLength: number;
}

export interface TotalStats {
  allGames: AllGameStats;
  soloGames: SoloGameStats;
  twoPlayerGames: TwoPlayerGameStats;
}

export interface GameHistoryStats {
  playerOne: string | undefined;
  playerTwo: string | undefined;
  status: GameStatus;
  winnerName?: string;
  winningMark?: Cell
  winningMove?: number;
  isSinglePlayerGame: boolean;
  computerWon?: boolean;
};

export interface GameStats {
  gameHistory: GameHistoryStats[];
  totalStats: TotalStats;
}

export interface StatsListItem {
  name: string;
  value: number | string;
  percentage?: number;
}

export interface GameStatsDialogProps {
  open: boolean;
  onClose: () => void;
  gameStats: GameStats | null;
};

export interface StatsTabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
};

export interface GameStatsTabsProps {
  allGameStats: StatsListItem[];
  soloGameStats: StatsListItem[];
  twoPlayerGameStats: StatsListItem[];
}

export interface GameStatsListProps {
  statType: StatsListItem[];
}

//* COMPONENTS *//
export interface StatusProps {
  winningValue: Cell | undefined;
  currentPlayer: PlayerMark;
  players: Players;
  isSinglePlayerGame: boolean;
  grid: GameBoard;
  gameStarted: boolean;
  moveHistory: MoveHistoryType;
};

export interface SquareProps {
  winningLine: WinningLine | undefined;
  index: number;
  isLatestMove: boolean;
  value: Nullable<PlayerMark>;
  onSquareClick: () => void;
  disabled?: boolean;
  invalidMove?: boolean;
};

//* Grid
export interface InteractiveGridBoardProps {
  mode: GridBoardType.Interactive;
  grid: GameBoard;
  currentPlayer: PlayerMark;
  OnPlayerMove: (index: number) => void;
  winningLine?: WinningLine | undefined;
  disabled?: boolean;
  invalidMove?: boolean;
};

export interface MoveHistoryGridBoardProps {
  mode: GridBoardType.MoveHistory;
  grid: GameBoard;
  latestMove: number;
  disabled?: true;
  invalidMove?: boolean;
};

export type GridBoardProps = InteractiveGridBoardProps | MoveHistoryGridBoardProps;

export function isInteractiveGridBoardProps(
  props: GridBoardProps
): props is InteractiveGridBoardProps {
  return props.mode === GridBoardType.Interactive;
};

export interface MoveHistoryProps {
  moveHistory: MoveHistoryType;
  players: Players;
};

//* Player form
export interface PlayerFormProps {
  players: Players;
  board: GameBoard;
  gameStats: GameStats | null;
  isSinglePlayerGame: boolean;
  setPlayers: React.Dispatch<React.SetStateAction<Players>>;
  setIsSinglePlayer: (singlePlayer: boolean) => void;
  onStartGame: () => void;
  onAbortGame: (board: GameBoard) => void;
  gameStarted: boolean;
  fetchStats: () => Promise<void>;
};

export interface PlayerSetupProps {
  players: Players;
  isSinglePlayerGame: boolean;
  errors: Record<string, boolean>;
  helperTexts: Record<string, string>;
  onStartGame: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export interface PlayerNamesProps {
  players: Players;
  currentPlayer: PlayerMark;
  isSinglePlayerGame: boolean;
};

export interface PlayerRowProps {
  name: string | undefined;
  isCurrent: boolean;
  isComputer: boolean;
}

export interface PlayerControlsProps {
  board: GameBoard;
  gameStats: GameStats | null;
  isEditingPlayers: boolean;
  onEditPlayers: () => void;
  onAbortGame: (board: GameBoard) => void;
  gameStarted: boolean;
  fetchStats: () => Promise<void>;
  setIsSinglePlayer: (singlePlayer: boolean) => void;
};

//* Other
export interface ErrorBannerProps {
  error: string | null;
  clearError: () => void;
}