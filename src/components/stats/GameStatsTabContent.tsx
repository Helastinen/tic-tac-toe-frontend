import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import GamesIcon from "@mui/icons-material/Games";

import { GameStatsTabContentProps } from "../../types/types.js";

const GameStatsTabContent = ({ statType }: GameStatsTabContentProps) => {

  return (
    <List sx={{ margin: "1rem 0.5rem", paddingTop: "0" }}>
      {statType.map(stat => {
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
  );
};

export default GameStatsTabContent;