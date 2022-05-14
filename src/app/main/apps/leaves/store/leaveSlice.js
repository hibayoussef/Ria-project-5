import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrder = createAsyncThunk(
  "leavesApp/order/getOrder",
  async (params) => {
    const response = await axios.get("/api/e-commerce-app/order", { params });
    const data = await response.data;

    return data === undefined ? null : data;
  }
);

export const saveOrder = createAsyncThunk(
  "leavesApp/order/saveOrder",
  async (order) => {
    const response = await axios.post("/api/e-commerce-app/order/save", order);
    const data = await response.data;

    return data;
  }
);

const leaveSlice = createSlice({
  name: "leavesApp/order",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getOrder.fulfilled]: (state, action) => action.payload,
    [saveOrder.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = leaveSlice.actions;

export default leaveSlice.reducer;
