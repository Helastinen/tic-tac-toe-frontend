import { TextField } from "@mui/material";
import { UI_TEXT } from "../../constants/uiText.js";
import { PlayerNameFieldTypes } from "../../types/types.js";

const PlayerNameField = ({ playerKey, players, errors, helperTexts, handleChange }: PlayerNameFieldTypes) => {

  return (
    <TextField
      error={errors[playerKey]}
      helperText={helperTexts[playerKey]}
      slotProps= {{
        formHelperText: {
          className: errors[playerKey]
            ? "player-setup-name-errors"
            : ""
        }
      }}
      id={playerKey}
      name={playerKey}
      label={
        players[playerKey] ??
        UI_TEXT.PLAYER_FORM[
          playerKey === "playerOne"
            ? "PLAYER_ONE_LABEL"
            : "PLAYER_TWO_LABEL"
        ]}
      variant="outlined"
      sx={{
        margin: "1rem",
        backgroundColor: "white"
      }}
      onChange={handleChange}
    />
  );
};

export default PlayerNameField;