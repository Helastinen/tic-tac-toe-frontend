import { useState } from "react";
import { Cell, PlayerMark, Players } from "../types/types.js";
import { UI_TEXT } from "../constants/uiText.js";

export const usePlayers = () => {
  const [players, setPlayers] = useState<Players>({
    playerOne: UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL,
    playerTwo: UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL,
  });

  const getWinnerName = (winValue?: Cell): string | undefined => {
    if (winValue === PlayerMark.X) return players.playerOne;
    if (winValue === PlayerMark.O) return players.playerTwo;
    return undefined;
  };

  return { players, setPlayers, getWinnerName };
};