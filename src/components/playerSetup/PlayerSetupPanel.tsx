import type React from "react";
import { useState } from "react";

import Grid from "@mui/material/Grid";

import { PlayerSetupPanelProps, Players } from "../../types/types.js";
import PlayerNameFields from "./PlayerNameFields.js";
import GameModeControls from "./GameModeControls.js";
import { usePlayerNameValidation } from "../../hooks/usePlayerNameValidation.js";
import { UI_TEXT } from "../../constants/uiText.js";

const PlayerSetupPanel = ({
  players,
  board,
  gameStats,
  isSinglePlayerGame,
  setPlayers,
  setIsSinglePlayer,
  gameStarted,
  onStartGame,
  onAbortGame,
  fetchStats
}: PlayerSetupPanelProps) => {
  const [isEditingPlayers, setIsEditingPlayers] = useState(false);
  const [draftPlayers, setDraftPlayers] = useState(players);

  const {
    errors,
    helperTexts,
    validateNameField
  }
  = usePlayerNameValidation();

  const handleChangeNames = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    //console.log("<PlayerSetupPanel> -> handleChangeNames(e.target): ", e.target);

    const { name, value } = e.target;
    validateNameField(name as keyof Players, value);

    setDraftPlayers(prev => ({
      ...prev,
      [name]: value,
      ...(isSinglePlayerGame && { playerTwo: UI_TEXT.GAME.COMPUTER_NAME })
    }) as Players);

  };

  const handleEditPlayers = () => {
    console.log("<PlayerSetupPanel> -> handleEditPlayers() triggered");
    console.log("<PlayerSetupPanel> -> handleEditPlayers() -> draftPlayers: ", draftPlayers);

    if (!isEditingPlayers) {
      // user enters edit mode and (re)loads committed names
      setDraftPlayers(players);
      setIsEditingPlayers(true);
    }
    else {
      // user leaves edit mode with updated names
      setPlayers(draftPlayers);
      setIsEditingPlayers(false);
    };
  };

  const startGameWithDraftPlayers = () => {
    setPlayers(draftPlayers);
    setIsEditingPlayers(false);
    onStartGame();
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{ justifyContent: "space-evenly", alignItems: "center" }}
      >
        <Grid size={12}>
          <GameModeControls
            board={board}
            gameStats={gameStats}
            onEditPlayers={handleEditPlayers}
            onAbortGame={onAbortGame}
            gameStarted={gameStarted}
            fetchStats={fetchStats}
            setIsSinglePlayer={setIsSinglePlayer}
          />
        </Grid>

        {isEditingPlayers && (
          <Grid size={12}>
            <PlayerNameFields
              players={draftPlayers}
              isSinglePlayerGame={isSinglePlayerGame}
              errors={errors}
              helperTexts={helperTexts}
              onStartGame={startGameWithDraftPlayers}
              handleChange={handleChangeNames}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PlayerSetupPanel;