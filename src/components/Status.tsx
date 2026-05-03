import MonitorIcon from "@mui/icons-material/Monitor";

import { UI_TEXT } from "../constants/uiText.js";
import { Cell, StatusProps, PlayerMark } from "../types/types.js";
import { isTieGame } from "../utils/utils.js";
import { COMPUTERMARK } from "../constants/config.js";

const Status = ({
  winningValue,
  currentPlayer,
  players,
  isSinglePlayerGame,
  grid,
  gameStarted,
  moveHistory
}: StatusProps) => {
  const getCurrentPlayerName = (): string | undefined => {
    return currentPlayer === PlayerMark.X ? players?.playerOne : players?.playerTwo;
  };

  const getWinningPlayerName = (winner: Cell): string | undefined => {
    if (isSinglePlayerGame && winner === COMPUTERMARK) {
      return UI_TEXT.STATUS.COMPUTER;
    }

    return (
      winner === PlayerMark.X
        ? players?.playerOne
        : players?.playerTwo
    );
  };

  const generateStatusMessage = () => {
    // show status if game is active or has any move history visible
    const shouldShowStatus = gameStarted || moveHistory.length > 1;

    if (!shouldShowStatus) return null;

    //* Tie game
    if (isTieGame (winningValue, grid)) {
      return (<span data-testid="tie-status"><strong>{UI_TEXT.STATUS.TIE}!</strong></span>);
    }

    //* Winner
    if (winningValue) {
      return (
        <span data-testid="winner-status">
          Winner is <strong>{getWinningPlayerName(winningValue)}</strong> on turn {moveHistory.length - 1}.
        </span>
      );
    }

    //* Turn
    return (
      <span data-testid="turn-status">
        <strong>Turn {moveHistory.length}:</strong>&nbsp;
        {isSinglePlayerGame && currentPlayer === PlayerMark.O
          ? <>
            {UI_TEXT.STATUS.COMPUTER_TURN} <MonitorIcon />
          </>
          : <>
            {UI_TEXT.STATUS.HUMAN_TURN} <strong>{getCurrentPlayerName()}</strong> ({currentPlayer}).
          </>
        }
      </span>
    );
  };

  const message = generateStatusMessage();

  return message ? <p className="status">{message}</p> : null;
};

export default Status;