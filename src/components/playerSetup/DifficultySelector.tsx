import type React from "react";

import { Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Difficulty, DifficultySelectorProps } from "../../types/types.js";
import { UI_TEXT } from "../../constants/uiText.js";

const DifficultySelector = ({ difficulty, setDifficulty }: DifficultySelectorProps) => {

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDifficulty: Difficulty
  ) => {
    if (newDifficulty !== null) {
      setDifficulty(newDifficulty);
      //console.log("difficulty selected: ", newDifficulty);
    }
  };

  return (
    <Grid size={12}>
      <Typography
        color="primary"
        variant="h6"
        className="difficulty-selector-title"
      >
        {UI_TEXT.PLAYER_FORM.DIFFICULTY_LEVEL}
      </Typography>
      <Grid size={12} display="flex" justifyContent="center">
        <ToggleButtonGroup
          color="primary"
          value={difficulty}
          exclusive
          onChange={handleChange}
          sx={{
            "padding": "0.5rem 0 1rem 0",
            "& .MuiToggleButton-root": {
              backgroundColor: "white",
              border: "1px solid rgba(0, 0, 0, 0.23)"
            },
            "& .Mui-selected": {
              backgroundColor: "#ebebeb",
              fontWeight: "bold",
              border: "1px solid rgba(0, 0, 0, 0.23)"
            }
          }}
          aria-label="Platform"
        >
          <ToggleButton value={Difficulty.easy}>Easy</ToggleButton>
          <ToggleButton value={Difficulty.medium}>Medium</ToggleButton>
          <ToggleButton value={Difficulty.hard}>Hardcore</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default DifficultySelector;