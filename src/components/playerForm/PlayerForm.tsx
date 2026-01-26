import type React from "react";

import Grid from "@mui/material/Grid";
import { PlayerFormProps, Players } from "../../types/types";

import { useState } from "react";

import PlayerSetup from "./PlayerSetup";
import PlayerNames from "./PlayerNames";
import PlayerControls from "./PlayerControls";
import { UI_TEXT } from "../../constants/uiText";
import { Typography } from "@mui/material";
import { validatePlayerName } from "../../utils/validation";

const PlayerForm = ({ players, setPlayers, onStartGame, gameStats, currentPlayer, fetchStats }: PlayerFormProps) => {
  const [isEditingPlayers, setIsEditingPlayers] = useState(true);
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
    setDraftPlayers(prev => ({
      ...prev,
      [name]: value
    }) as Players);
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

    setIsEditingPlayers(!isEditingPlayers);
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
          <Typography
            color="primary"
            variant="h6"
            className="player-setup-title"
          >
            {isEditingPlayers ? UI_TEXT.PLAYER_FORM.ENTER_PLAYERS : UI_TEXT.PLAYER_FORM.PLAYERS}
          </Typography>
        </Grid>
        {isEditingPlayers && (
          <Grid size={12}>
            <PlayerSetup
              errors={errors}
              helperTexts={helperTexts}
              players={draftPlayers}
              handleChange={handleChangeNames}
            />
          </Grid>
        )}
        {!isEditingPlayers && (
          <Grid size={12}>
            <PlayerNames currentPlayer= {currentPlayer} players={players} />
          </Grid>
        )}
        <Grid size={12}>
          <PlayerControls
            errors={errors}
            players={draftPlayers}
            gameStats={gameStats}
            isEditingPlayers={isEditingPlayers}
            onStartGame={(players) => onStartGame(players)}
            onEditPlayers={handleEditPlayers}
            fetchStats={fetchStats}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PlayerForm;