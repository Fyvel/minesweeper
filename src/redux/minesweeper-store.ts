import { createStore } from "redux";
import { minesweeperStore } from "./minesweeper-reducers";

export default createStore(minesweeperStore);
