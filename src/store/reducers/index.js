import { combineReducers } from "redux";
import game from "./game";

let reducers = {
  game,
};
let combinedReducer = combineReducers(reducers);
export default combinedReducer;