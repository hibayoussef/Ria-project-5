import { combineReducers } from "@reduxjs/toolkit";
import leave from "./leaveSlice";
import leaves from "./leavesSlice";
import approvalLeaves from "./approvalLeaveSlice";
import myLeaves from "./myLeavesSlice";
import rejectedLeaves from "./rejectedLeaveSlice";

const reducer = combineReducers({
  leaves,
  leave,
  approvalLeaves,
  myLeaves,
  rejectedLeaves,
});

export default reducer;
