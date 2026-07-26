import CircularProgress from "@mui/material/CircularProgress";

import GridBoard from "./components/grid/GridBoard.js";
import PlayerSetupPanel from "./components/playerSetup/PlayerSetupPanel.js";
import MoveHistory from "./components/grid/MoveHistory.js";
import Status from "./components/Status.js";

import useGameEngine from "./hooks/useGameEngine.js";
import GameTitle from "./components/GameTitle.js";
import ErrorBanner from "./components/ErrorBanner.js";
import SectionDivider from "./components/SectionDivider.js";
import Copyright from "./components/Copyright.js";
import { GridBoardType } from "./types/types.js";

const Game = () => {
  const {
    moveHistory,
    isSinglePlayerGame,
    isComputerTurn,
    currentPlayer,
    players,
    difficulty,
    winningValue,
    winningLine,
    gameStarted,
    gameStats,
    currentBoard,
    error,
    invalidMove,
    clearError,
    handleStartGame,
    handleAbortGame,
    handleHumanMove,
    setPlayers,
    fetchStats,
    setIsSinglePlayer,
    setDifficulty
  } = useGameEngine();

  if (!currentBoard) return <CircularProgress />;

  return (
    <div className="game-background">
      <GameTitle />
      {error && <ErrorBanner error={error} clearError={clearError} />}
      <PlayerSetupPanel
        players={players}
        board={currentBoard}
        gameStats={gameStats}
        isSinglePlayerGame={isSinglePlayerGame}
        setPlayers={setPlayers}
        setIsSinglePlayer={setIsSinglePlayer}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        gameStarted={gameStarted}
        onStartGame={handleStartGame}
        onAbortGame={handleAbortGame}
        fetchStats={fetchStats}
      />
      <SectionDivider mt={1.5} mb={2} />
      <Status
        winningValue={winningValue}
        currentPlayer={currentPlayer}
        players={players}
        isSinglePlayerGame={isSinglePlayerGame}
        grid={currentBoard}
        gameStarted={gameStarted}
        moveHistory={moveHistory}
      />
      <GridBoard
        disabled={!gameStarted || isComputerTurn}
        mode={GridBoardType.Interactive}
        winningLine={winningLine}
        currentPlayer={currentPlayer}
        grid={currentBoard}
        OnPlayerMove={handleHumanMove}
        invalidMove={invalidMove}
      />
      <SectionDivider mt={2} mb={1} />
      <MoveHistory moveHistory={moveHistory} players={players} />
      <Copyright />
    </div>
  );
};

export default Game;