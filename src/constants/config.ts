import { PlayerMark } from "../types/types.js";

export const CONFIG = {
  API_BASE_URL: "/api",
  API_GAMEHISTORY: "gamehistory",
  API_TOTALSTATS: "totalstats",
};
export const BOARDSIZE = 9;
export const COMPUTERMARK: PlayerMark = PlayerMark.O;
export const COMPUTER_THINKING_TIME_MAX_SEC = 3;
export const COMPUTER_THINKING_TIME_MIN_SEC = 1;