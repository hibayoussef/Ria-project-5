import { combineReducers } from "@reduxjs/toolkit";
import leave from "./leaveSlice";
import leaves from "./leavesSlice";

const reducer = combineReducers({
  leaves,
  leave,
});

export default reducer;
