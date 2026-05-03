import { Button, Grid, TextField, Typography } from "@mui/material";
import { UI_TEXT } from "../../constants/uiText.js";
import { PlayerSetupProps } from "../../types/types.js";

const PlayerSetup = ({
  players,
  isSinglePlayerGame,
  errors,
  helperTexts,
  onStartGame,
  handleChange
}: PlayerSetupProps) => (
  <Grid size={{ xs: 12 }}>
    <Grid
      container
      spacing={0}
      className="player-setup-grid"
    >
      <Grid size={12}>
        <Typography
          color="primary"
          variant="h6"
          className="player-setup-title"
        >
          {isSinglePlayerGame ? UI_TEXT.PLAYER_FORM.ENTER_PLAYER :  UI_TEXT.PLAYER_FORM.ENTER_PLAYERS}
        </Typography>
      </Grid>
      <TextField
        error={errors.playerOne}
        helperText={helperTexts.playerOne}
        slotProps= {{
          formHelperText: {
            className: errors.playerOne ? "player-setup-name-errors" : ""
          }
        }}
        id="playerOne"
        name="playerOne"
        label={players?.playerOne ?? UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL}
        variant="outlined"
        sx={{
          margin: "1rem",
          backgroundColor: "white"
        }}
        onChange={handleChange}
      />

      {!isSinglePlayerGame && <TextField
        error={errors.playerTwo}
        helperText={helperTexts.playerTwo}
        slotProps= {{
          formHelperText: {
            className: errors.playerTwo ? "player-setup-name-errors" : ""
          }
        }}
        id="playerTwo"
        name="playerTwo"
        label={players?.playerTwo ?? UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL}
        variant="outlined"
        sx={{
          margin: "1rem",
          backgroundColor: "white"
        }}
        onChange={handleChange}
      />}

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
  </Grid>
);

export default PlayerSetup;