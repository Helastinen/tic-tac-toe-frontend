import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GamesIcon from '@mui/icons-material/Games';
import CircularProgress from '@mui/material/CircularProgress';

import { calculateAverageRoundWin, getPlayerMarkWins, getSafeStats } from '../utils/statsHelper';
import { GameStatsDialogProps, PlayerMark } from '../types/types';
import { UI_TEXT } from '../constants/uiText';

const GameStatsDialog = ({open, onClose, gameStats }: GameStatsDialogProps) => {
  const { gameHistory, totalStats } = getSafeStats(gameStats);
  const { playerOneWins, playerTwoWins, ties, aborted } = totalStats;
  const stats = [
    { name: UI_TEXT.STATS.GAMES_PLAYED, value: playerOneWins + playerTwoWins + ties + aborted },
    { name: UI_TEXT.STATS.PLAYER_ONE_WINS, value: playerOneWins },
    { name: UI_TEXT.STATS.PLAYER_TWO_WINS, value: playerTwoWins },
    { name: UI_TEXT.STATS.TIES, value: ties },
    { name: UI_TEXT.STATS.ABORTED, value: aborted },
    { name: UI_TEXT.STATS.X_WINS, value: getPlayerMarkWins(gameHistory, PlayerMark.X)},
    { name: UI_TEXT.STATS.O_WINS, value: getPlayerMarkWins(gameHistory, PlayerMark.O)},
    { name: UI_TEXT.STATS.AVERAGE_ROUND, value: calculateAverageRoundWin(gameHistory)},
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
        {UI_TEXT.STATS.TITLE}
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
            : <List sx={{ margin: "0rem 0.5rem", paddingTop: "0" }}>
                {stats.map(stat => {
                  return (
                    <ListItem key={stat.name}>
                      <ListItemIcon sx={{ minWidth: "2rem" }}>
                        <GamesIcon color="primary" fontSize="small" aria-hidden="true" />
                      </ListItemIcon>
                      {stat.name}:&nbsp;<strong>{stat.value}</strong>.
                    </ListItem>
                  )
                })}
              </List>
          }
      </DialogContent>
    </Dialog>
  )
}

export default GameStatsDialog;