import type React from "react";
import { useState } from "react";

import Grid from "@mui/material/Grid";

import { PlayerFormProps, Players } from "../../types/types.js";
import PlayerSetup from "./PlayerSetup.js";
import PlayerControls from "./PlayerControls.js";

import { validatePlayerName } from "../../utils/validation.js";
import { UI_TEXT } from "../../constants/uiText.js";

const PlayerForm = ({
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
}: PlayerFormProps) => {
  const [isEditingPlayers, setIsEditingPlayers] = useState(false);
  const [draftPlayers, setDraftPlayers] = useState(players);
  const [errors, setErrors] = useState<Record<keyof Players, boolean>>({
    playerOne: false,
    playerTwo: false,
  });
  const [helperTexts, setHelperTexts] = useState<Record<keyof Players, string>>({
    playerOne: "",
    playerTwo: "",
  });

  const handleChangeNames = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    console.log("<PlayerForm> -> handleChangeNames(e.target): ", e.target);

    const { name, value } = e.target;
    validateNameField(name as keyof Players, value);

    if (isSinglePlayerGame) {
      setDraftPlayers(prev => ({
        ...prev,
        playerTwo: UI_TEXT.GAME.COMPUTER_NAME
      }) as Players);
    } else {
      setDraftPlayers(prev => ({
        ...prev,
        [name]: value
      }) as Players);
    }
  };

  const handleEditPlayers = () => {
    console.log("<PlayerForm> -> handleEditPlayers() triggered");
    console.log("<PlayerForm> -> handleEditPlayers() -> draftPlayers: ", draftPlayers);

    if (!isEditingPlayers) {
      // user enters edit mode and (re)loads committed names
      setDraftPlayers(players);
    }
    else {
      // user leaves edit mode with updated names
      setPlayers(draftPlayers);
    };

    setIsEditingPlayers(true);
  };

  const validateNameField = (field: keyof Players, value: string) => {
    const { error, message } = validatePlayerName(value);

    setErrors(prev => ({ ...prev, [field]: error }));
    setHelperTexts(prev => ({ ...prev, [field]: message }));
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{ justifyContent: "space-evenly", alignItems: "center" }}
      >
        <Grid size={12}>
          <PlayerControls
            board={board}
            gameStats={gameStats}
            isEditingPlayers={isEditingPlayers}
            onEditPlayers={handleEditPlayers}
            onAbortGame={onAbortGame}
            gameStarted={gameStarted}
            fetchStats={fetchStats}
            setIsSinglePlayer={setIsSinglePlayer}
          />
        </Grid>

        {isEditingPlayers && (
          <Grid size={12}>
            <PlayerSetup
              players={draftPlayers}
              isSinglePlayerGame={isSinglePlayerGame}
              errors={errors}
              helperTexts={helperTexts}
              onStartGame={() => {
                setPlayers(draftPlayers);
                setIsEditingPlayers(false);
                onStartGame();
              }}
              handleChange={handleChangeNames}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PlayerForm;