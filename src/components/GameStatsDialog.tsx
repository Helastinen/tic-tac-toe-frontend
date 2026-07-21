import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GamesIcon from "@mui/icons-material/Games";
import CircularProgress from "@mui/material/CircularProgress";

import { calculateAverageRoundWin, getSafeStats, getStatPercentage } from "../utils/statsHelper.js";
import { GameStatsDialogProps, StatsListItem } from "../types/types.js";
import { UI_TEXT } from "../constants/uiText.js";

const GameStatsDialog = ({ open, onClose, gameStats }: GameStatsDialogProps) => {
  const { gameHistory, totalStats } = getSafeStats(gameStats);
  console.log("gameHistory: ", gameHistory);
  console.log("totalStats: ", totalStats);
  const { allGames, soloGames, twoPlayerGames } = totalStats;
  const {
    totalGames,
    wins: allGameWins,
    ties: allGameTies,
    aborted: allGameAborted,
  } = allGames;

  const {
    totalSoloGames,
    humanWins,
    computerWins,
    ties: soloTies,
    aborted: soloAborted,
  } = soloGames;

  const {
    totalTwoPlayerGames,
    playerOneWins,
    playerTwoWins,
    ties: twoPlayerTies,
    aborted: twoPlayerAborted,
  } = twoPlayerGames;

  const allGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalGames },
    { name: UI_TEXT.STATS.WINS, value: allGameWins, percentage: getStatPercentage(allGameWins, totalGames) },
    { name: UI_TEXT.STATS.TIES, value: allGameTies, percentage: getStatPercentage(allGameTies, totalGames) },
    { name: UI_TEXT.STATS.ABORTED, value: allGameAborted, percentage: getStatPercentage(allGameAborted, totalGames) },
    { name: UI_TEXT.STATS.AVERAGE_ROUND, value: calculateAverageRoundWin(gameHistory) ?? UI_TEXT.STATS.NOT_APPLICABLE },
  ];

  const soloGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalSoloGames },
    { name: UI_TEXT.STATS.HUMAN_WINS, value: humanWins, percentage: getStatPercentage(humanWins, totalSoloGames) },
    { name: UI_TEXT.STATS.COMPUTER_WINS, value: computerWins, percentage: getStatPercentage(computerWins, totalSoloGames) },
    { name: UI_TEXT.STATS.TIES, value: soloTies, percentage: getStatPercentage(soloTies, totalSoloGames) },
    { name: UI_TEXT.STATS.ABORTED, value: soloAborted, percentage: getStatPercentage(soloAborted, totalSoloGames) },
  ];

  const twoPlayerGameStats: StatsListItem[] = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: totalTwoPlayerGames },
    { name: UI_TEXT.STATS.X_WINS, value: playerOneWins, percentage: getStatPercentage(playerOneWins, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.O_WINS, value: playerTwoWins, percentage: getStatPercentage(playerTwoWins, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.TIES, value: twoPlayerTies, percentage: getStatPercentage(twoPlayerTies, totalTwoPlayerGames) },
    { name: UI_TEXT.STATS.ABORTED, value: twoPlayerAborted, percentage: getStatPercentage(twoPlayerAborted, totalTwoPlayerGames) },
  ];

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
          <>
            {UI_TEXT.STATS.TITLES.ALL_GAMES}
            <List sx={{ margin: "0rem 0.5rem", paddingTop: "0" }}>
              {allGameStats.map(stat => {
                return (
                  <ListItem key={stat.name}>
                    <ListItemIcon sx={{ minWidth: "2rem" }}>
                      <GamesIcon color="primary" fontSize="small" aria-hidden="true" />
                    </ListItemIcon>
                    {stat.name}:&nbsp;
                    <strong>{stat.value}</strong>.
                    {stat.percentage !== undefined &&
                      <>&nbsp;({stat.percentage}%)</>
                    }
                  </ListItem>
                );
              })}
            </List>

            {UI_TEXT.STATS.TITLES.SOLO_GAMES}
            <List sx={{ margin: "0rem 0.5rem", paddingTop: "0" }}>
              {soloGameStats.map(stat => {
                return (
                  <ListItem key={stat.name}>
                    <ListItemIcon sx={{ minWidth: "2rem" }}>
                      <GamesIcon color="primary" fontSize="small" aria-hidden="true" />
                    </ListItemIcon>
                    {stat.name}:&nbsp;
                    <strong>{stat.value}</strong>.
                    {stat.percentage !== undefined &&
                      <>&nbsp;({stat.percentage}%)</>
                    }
                  </ListItem>
                );
              })}
            </List>

            {UI_TEXT.STATS.TITLES.TWO_PLAYER_GAMES}
            <List sx={{ margin: "0rem 0.5rem", paddingTop: "0" }}>
              {twoPlayerGameStats.map(stat => {
                return (
                  <ListItem key={stat.name}>
                    <ListItemIcon sx={{ minWidth: "2rem" }}>
                      <GamesIcon color="primary" fontSize="small" aria-hidden="true" />
                    </ListItemIcon>
                    {stat.name}:&nbsp;
                    <strong>{stat.value}</strong>.
                    {stat.percentage !== undefined &&
                      <>&nbsp;({stat.percentage}%)</>
                    }
                  </ListItem>
                );
              })}
            </List>
          </>
        }
      </DialogContent>
    </Dialog>
  );
};

export default GameStatsDialog;