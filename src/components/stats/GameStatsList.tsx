import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import GamesIcon from "@mui/icons-material/Games";
import { Gauge } from "@mui/x-charts/Gauge";

import { GameStatsListProps } from "../../types/types.js";
import Box from "@mui/material/Box";

const GameStatsList = ({ statType }: GameStatsListProps) => {

  return (
    <List sx={{ margin: "1rem 0.5rem", paddingTop: "0" }}>
      {statType.map(stat => {
        return (
          <ListItem key={stat.name}>
            <ListItemIcon sx={{ minWidth: "2rem" }}>
              <GamesIcon color="primary" fontSize="small" aria-hidden="true" />
            </ListItemIcon>
            {stat.name}:&nbsp;
            <strong>{stat.value}</strong>
            {stat.percentage !== undefined &&
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  height: "1.5rem",
                }}
              >
                <Gauge
                  width={60}
                  height={40}
                  startAngle={-90}
                  endAngle={90}
                  value={stat.percentage}
                  sx={{
                    "& .MuiGauge-valueText": {
                      transform: "translateY(-0.3rem)",
                      fontSize: "0.75rem",
                    },
                  }}
                />
              </ Box>%
            </>
            }
          </ListItem>
        );
      })}
    </List>
  );
};

export default GameStatsList;