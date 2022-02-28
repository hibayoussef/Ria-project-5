import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const getOrder = createAsyncThunk(
//   "eCommerceApp/order/getOrder",
//   async (params) => {
//     const response = await axios.get("/api/e-commerce-app/order", { params });
//     const data = await response.data;

//     return data === undefined ? null : data;
//   }
// );

export const getReceipt = createAsyncThunk(
  "Receipts/getReceipt",
  async (params) => {
    console.log("idddd: ", params);
    const response = await axios.get(`/financial/receipts/${params}`);
    console.log("url: ", "/financial/receipts/", params);
    console.log("resss: ", response);
    const data = response.data.data;
    console.log("reddddd: ", data);
    // return data === undefined ? null : data;
    return data;
  }
);

export const saveOrder = createAsyncThunk(
  "eCommerceApp/order/saveOrder",
  async (order) => {
    const response = await axios.post("/api/e-commerce-app/order/save", order);
    const data = await response.data;

    return data;
  }
);

const orderSlice = createSlice({
  name: "eCommerceApp/order",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    // [getOrder.fulfilled]: (state, action) => action.payload,
    [getReceipt.fulfilled]: (state, action) => action.payload,
    [saveOrder.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
