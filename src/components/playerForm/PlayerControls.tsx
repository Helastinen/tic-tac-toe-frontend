import { useState } from "react";

import { Box, Button, Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import MonitorIcon from "@mui/icons-material/Monitor";
import GroupIcon from "@mui/icons-material/Group";

import GameStatsDialog from "../GameStatsDialog.js";
import { UI_TEXT } from "../../constants/uiText.js";
import { PlayerControlsProps } from "../../types/types.js";

const PlayerControls = ({
  gameStats,
  onEditPlayers,
  fetchStats,
  setIsSinglePlayer
}: PlayerControlsProps) => {
  const [openStatsDialog, setOpenStatsDialog] = useState(false);

  const handleStatsDialogOpen = () => {
    setOpenStatsDialog(true);
    // open dialog even if fetchStats hasn't returned
    void fetchStats();
  };
  const handleStatsDialogClose = () => setOpenStatsDialog(false);

  return (
    <Grid
      size={{ xs: 12 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        variant="contained"
        endIcon={
          <Box display="flex" alignItems="center">
            <PersonIcon fontSize="small" />
            <MonitorIcon fontSize="small" />
          </Box>
        }
        onClick={() => {
          onEditPlayers();
          setIsSinglePlayer(true);
        }}
        sx={{
          margin: "1rem 0.5rem 0.5rem",
          "&.Mui-disabled": {
            backgroundColor: "#bdbdbd",
            color: "gray",
            opacity: 1
          }
        }}
      >
        {UI_TEXT.GAME.SINGLE_PLAYER}
      </Button>

      <Button
        variant="contained"
        endIcon={<GroupIcon />}
        onClick={() => {
          onEditPlayers();
          setIsSinglePlayer(false);
        }}
        sx={{
          margin: "1rem 0.5rem 0.5rem",
          "&.Mui-disabled": {
            backgroundColor: "#bdbdbd",
            color: "gray",
            opacity: 1
          }
        }}
      >
        {UI_TEXT.GAME.TWO_PLAYERS}
      </Button>

      <Button
        variant="outlined"
        endIcon={<BarChartIcon />}
        onClick={handleStatsDialogOpen}
        sx={{
          margin: "1rem 0.5rem 0.5rem",
          backgroundColor: "white"
        }}
      >
        {UI_TEXT.GAME.STATS}
      </Button>

      <GameStatsDialog
        open={openStatsDialog}
        onClose={handleStatsDialogClose}
        gameStats={gameStats}
      >
      </GameStatsDialog>
    </Grid>
  );
};

export default PlayerControls;