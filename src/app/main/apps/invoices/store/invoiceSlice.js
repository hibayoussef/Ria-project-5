import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";

// export const getInvoice = createAsyncThunk(
//   "invoicesApp/invoice/getInvoice",
//   async (params) => {
//     const response = await axios.get("/invoices/cruds", { params });
//     const data = await response.data.data;

//     return data === undefined ? null : data;
//   }
// );

export const getInvoice = async (params) => {
  const response = await axios.get(`/invoices/cruds/${params.invoiceId}`);
  console.log("id: ", params.invoiceId);
  return response.data.data;
};

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.post("/api/e-commerce-app/remove-product", { id });

    return id;
  }
);

// export const saveInvoice = createAsyncThunk(
//   "invoicesApp/invoice/saveInvoice",
//   async (invoiceData, { dispatch, getState }) => {
//     const { invoice } = getState().invoicesApp;

//     const response = await axios.post("/invoices/cruds", {
//       ...invoice,
//       ...invoiceData,
//     });
//     const data = await response.data;

//     return data;
//   }
// );
// export const saveInvoice = createAsyncThunk(
//   "invoicesApp/invoice/saveInvoice",
// async (
//   invoice,
//   netAmount,
//   taxNumber,
//   grossAmount,
//   issueDate,
//   dueDate,
//     { dispatch, getState }
//   ) => {
//     const fd = new FormData();
//     fd.append("invoice", invoice);
//     fd.append("data", JSON.stringify({ title, price, description, category }));
//   }
// );

export const saveInvoice = createAsyncThunk(
  "invoicesApp/invoice/saveInvoice",
  async (invoice, netAmount, taxNumber, grossAmount, issueDate, dueDate) => {
    console.log(invoice, netAmount, taxNumber, grossAmount, issueDate, dueDate);
    const fd = new FormData();
    fd.append("invoice", invoice);
    fd.append("data", {
      netAmount,
      taxNumber,
      grossAmount,
      issueDate,
      dueDate,
    });
    await axios.post("/invoices/cruds", fd, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }
);

const invoiceSlice = createSlice({
  name: "invoicesApp/invoice",
  initialState: null,
  reducers: {
    resetInvoice: () => null,
    newInvoice: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          invoice: "",
          netAmount: 0,
          taxNumber: 0,
          grossAmount: 0,
          dueDate: "",
          issueDate: "",
        },
      }),
    },
  },
  extraReducers: {
    // [getInvoice.fulfilled]: (state, action) => action.payload,
    [saveInvoice.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newInvoice, resetInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
