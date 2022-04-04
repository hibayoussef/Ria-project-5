import { combineReducers } from "@reduxjs/toolkit";
import jobs from "./jobsSlice";
import user from "./userSlice";

const reducer = combineReducers({
  jobs,
  user,
});

export default reducer;
