import { Chip, Stack } from "@mui/material";
import { UI_TEXT } from "../../constants/uiText.js";
import { Difficulty, GameInfoChipsProps } from "../../types/types.js";

const getGameMode = (isSinglePlayerGame: boolean) => isSinglePlayerGame ? UI_TEXT.GAME.SINGLE_PLAYER : UI_TEXT.GAME.TWO_PLAYERS;

const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
  case Difficulty.easy:
    return "success";
  case Difficulty.medium:
    return "warning";
  case Difficulty.hard:
    return "error";
  default:
    return "info";
  }
};

const GameInfoChips = ({ difficulty, isSinglePlayerGame, players }: GameInfoChipsProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ margin: "0.5rem 0 -0.5rem 0" }}
    >
      <Chip color="secondary" label={getGameMode(isSinglePlayerGame)}></Chip>
      {isSinglePlayerGame && <Chip color={getDifficultyColor(difficulty)} label={difficulty}></Chip>}
      <Chip color="primary" label={players.playerOne}></Chip>
      {!isSinglePlayerGame && <Chip color="primary" label={players.playerTwo}></Chip>}
    </Stack>
  );
};

export default GameInfoChips;