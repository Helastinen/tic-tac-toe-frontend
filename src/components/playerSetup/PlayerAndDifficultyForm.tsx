import { Button, Grid, Typography } from "@mui/material";
import { UI_TEXT } from "../../constants/uiText.js";
import { PlayerAndDifficultyFormsProps } from "../../types/types.js";
import DifficultySelector from "./DifficultySelector.js";
import PlayerNameField from "./PlayerNameField.js";

const PlayerAndDifficultyForms = ({
  players,
  isSinglePlayerGame,
  errors,
  helperTexts,
  difficulty,
  setDifficulty,
  onStartGame,
  handleChange
}: PlayerAndDifficultyFormsProps) => {
  const title = isSinglePlayerGame
    ? UI_TEXT.PLAYER_FORM.ENTER_PLAYER
    : UI_TEXT.PLAYER_FORM.ENTER_PLAYERS;

  return (

    <Grid
      container
      spacing={0}
      className="player-and-difficulty-setup"
    >
      {isSinglePlayerGame &&
        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      }

      <Grid size={12}>
        <Typography
          color="primary"
          variant="h6"
          className="player-setup-title"
        >
          {title}
        </Typography>
      </Grid>

      <PlayerNameField
        playerKey="playerOne"
        players={players}
        errors={errors}
        helperTexts={helperTexts}
        handleChange={handleChange}
      />

      {!isSinglePlayerGame &&
        <PlayerNameField
          playerKey="playerTwo"
          players={players}
          errors={errors}
          helperTexts={helperTexts}
          handleChange={handleChange}
        />
      }

      <Button
        disabled={errors.playerOne || errors.playerTwo}
        variant="contained"
        onClick={onStartGame}
        sx={{
          margin: "1rem 0.5rem 0.5rem",
          "&.Mui-disabled": {
            backgroundColor: "#bdbdbd",
            color: "gray",
            opacity: 1
          }
        }}
      >
        {UI_TEXT.GAME.START}
      </Button>
    </Grid>

  );
};

export default PlayerAndDifficultyForms;