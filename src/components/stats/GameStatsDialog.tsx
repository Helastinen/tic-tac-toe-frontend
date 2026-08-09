import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

import { buildStats, getSafeStats } from "../../utils/statsHelper.js";
import { GameStatsDialogProps } from "../../types/types.js";
import { UI_TEXT } from "../../constants/uiText.js";
import GameStatsTabs from "./GameStatsTabs.js";


const GameStatsDialog = ({ open, onClose, gameStats }: GameStatsDialogProps) => {
  const { gameHistory, totalStats } = getSafeStats(gameStats);
  console.log("gameHistory: ", gameHistory);
  //console.log("totalStats: ", totalStats);
  const { allGameStats, soloGameStats, twoPlayerGameStats } = buildStats(totalStats);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-modal="true"
      aria-labelledby="game-stats-title"
    >
      <DialogTitle
        id="game-stats-title"
        variant="h2"
        color="primary"
        sx={{ fontSize: "2.5rem" }}
      >
        {UI_TEXT.STATS.TITLES.MAIN_TITLE}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent id="game-stats-description" sx={{ paddingTop: "0" }}>
        {!gameStats
          ? <div className="loading-spinner">
            <CircularProgress />
          </div>
          :
          <GameStatsTabs
            allGameStats={allGameStats}
            soloGameStats={soloGameStats}
            twoPlayerGameStats={twoPlayerGameStats}
          />
        }
      </DialogContent>
    </Dialog>
  );
};

export default GameStatsDialog;