import { PlayerMark, PlayerNamesProps, PlayerRowProps } from "../../types/types.js";
import PersonIcon from "@mui/icons-material/Person";
import MonitorIcon from "@mui/icons-material/Monitor";
import StarIcon from "@mui/icons-material/Star";

const PlayerNames = ({ players, currentPlayer, isSinglePlayerGame }: PlayerNamesProps) => {
  return (
    <div className="player-form-player-names">
      <PlayerRow
        name={players?.playerOne}
        isCurrent={currentPlayer === PlayerMark.X}
        isComputer={false}
      />
      <PlayerRow
        name={players?.playerTwo}
        isCurrent={currentPlayer === PlayerMark.O}
        isComputer={isSinglePlayerGame}
      />
    </div>
  );
};

const PlayerRow = ({ name, isCurrent, isComputer }: PlayerRowProps) => {
  return (
    <span className="player-name">
      {isCurrent &&
        <StarIcon
          color="primary"
          fontSize="small"
          aria-label="current player indicator"
          sx={{ verticalAlign: "text-bottom" }}
        />
      }
      {isCurrent ? <strong>{name}</strong> : name}
      {isComputer ? <MonitorIcon /> : <PersonIcon />}
    </span>
  );
};

export default PlayerNames;