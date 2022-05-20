import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLeaves } from "./leavesSlice";

export const getLeave = createAsyncThunk(
  "leavesApp/leave/getLeave",
  async (params) => {
    console.log("paaarams: ", params);
    const response = await axios.get(`/leaves/${params.leaveId}`);
    const data = await response.data;
    console.log("leave: ", data);

    return data === undefined ? null : data;
  }
);

const leaveSlice = createSlice({
  name: "leavesApp/leave",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getLeave.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = leaveSlice.actions;

export default leaveSlice.reducer;
