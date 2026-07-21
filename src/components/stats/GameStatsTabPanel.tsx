import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { UI_TEXT } from "../../constants/uiText.js";
import { GameStatsTabPanelProps } from "../../types/types.js";
import CustomTabPanel from "./CustomTabPanel.js";
import GameStatsTabContent from "./GameStatsTabContent.js";

const GameStatsTabPanel = ({ allGameStats, soloGameStats, twoPlayerGameStats }: GameStatsTabPanelProps) => {
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
      <CustomTabPanel value={value} index={0}>
        <GameStatsTabContent statType={allGameStats} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GameStatsTabContent statType={soloGameStats} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GameStatsTabContent statType={twoPlayerGameStats} />
      </CustomTabPanel>
    </Box>
  );
};

export default GameStatsTabPanel;