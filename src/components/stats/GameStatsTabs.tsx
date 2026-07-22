import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { UI_TEXT } from "../../constants/uiText.js";
import { GameStatsTabsProps } from "../../types/types.js";
import StatsTabPanel from "./StatsTabPanel.js";
import GameStatsList from "./GameStatsList.js";

const GameStatsTabs = ({ allGameStats, soloGameStats, twoPlayerGameStats }: GameStatsTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="Stats tabs">
          <Tab
            label={UI_TEXT.STATS.TITLES.ALL_GAMES}
            id="tab-0"
            aria-controls="tabpanel-0"
          ></Tab>
          <Tab
            label={UI_TEXT.STATS.TITLES.SOLO_GAMES}
            id={"tab-1"}
            aria-controls="tabpanel-1"
          >
          </Tab>
          <Tab
            label={UI_TEXT.STATS.TITLES.TWO_PLAYER_GAMES}
            id={"tab-2"}
            aria-controls="tabpanel-2"
          >
          </Tab>
        </Tabs>
      </Box>
      <StatsTabPanel value={value} index={0}>
        <GameStatsList statType={allGameStats} />
      </StatsTabPanel>
      <StatsTabPanel value={value} index={1}>
        <GameStatsList statType={soloGameStats} />
      </StatsTabPanel>
      <StatsTabPanel value={value} index={2}>
        <GameStatsList statType={twoPlayerGameStats} />
      </StatsTabPanel>
    </Box>
  );
};

export default GameStatsTabs;