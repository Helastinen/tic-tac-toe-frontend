import CircularProgress from "@mui/material/CircularProgress";

import GridBoard from "./components/grid/GridBoard";
import PlayerForm from "./components/playerForm/PlayerForm";
import MoveHistory from "./components/grid/MoveHistory";
import Status from "./components/Status";

import useGameEngine from "./hooks/useGameEngine";
import GameTitle from "./components/GameTitle";
import ErrorBanner from "./components/ErrorBanner";
import SectionDivider from "./components/SectionDivider";
import Copyright from "./components/copyright";

const Game = () => {
  const {
    moveHistory,
    currentPlayer,
    players,
    winningValue,
    winningLine,
    gameStarted,
    gameStats,
    currentBoard,
    error,
    invalidMove,
    clearError,
    handleStartGame,
    handlePlayerMove,
    setPlayers,
    fetchStats,
  } = useGameEngine();

  if (!currentBoard) return <CircularProgress />;

  return (
    <>
      <div className="game-background">
        <GameTitle />
        {error && <ErrorBanner error={error} clearError={clearError} />}
        <PlayerForm
          players={players}
          setPlayers={setPlayers}
          onStartGame={(players) => handleStartGame(players)}
          gameStats={gameStats}
          currentPlayer={currentPlayer}
          fetchStats={fetchStats}
        />
        <SectionDivider mt={1.5} mb={2} />
        <Status
          winningValue={winningValue}
          currentPlayer={currentPlayer}
          players={players}
          grid={currentBoard}
          gameStarted={gameStarted}
          moveHistory={moveHistory}
        />
        <GridBoard
          disabled={!gameStarted}
          mode="interactive"
          winningLine={winningLine}
          currentPlayer={currentPlayer}
          grid={currentBoard}
          OnPlayerMove={handlePlayerMove}
          invalidMove={invalidMove}
        />
        <SectionDivider mt={2} mb={1} />
        <MoveHistory moveHistory={moveHistory} players={players} />
        <Copyright />
      </div>
    </>
  );
};

export default Game;