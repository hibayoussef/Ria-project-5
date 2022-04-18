import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getInvoices = createAsyncThunk(
  "invoicesApp/products/getInvoices",
  async () => {
    const response = await axios.get("/invoices/cruds");
    const data = await response.data.data;
    console.log("invoices from backend:", data);

    return data;
  }
);

export const removeProducts = createAsyncThunk(
  "eCommerceApp/products/removeProducts",
  async (productIds, { dispatch, getState }) => {
    await axios.post("/api/e-commerce-app/remove-products", { productIds });

    return productIds;
  }
);

const invoicesAdapter = createEntityAdapter({});

export const { selectAll: selectInvoices, selectById: selectInvoiceById } =
  invoicesAdapter.getSelectors((state) => state.invoicesApp.invoices);

const invoicesSlice = createSlice({
  name: "invoicesApp/invoices",
  initialState: invoicesAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setInvoicesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getInvoices.fulfilled]: invoicesAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      invoicesAdapter.removeMany(state, action.payload),
  },
});

export const { setInvoicesSearchText } = invoicesSlice.actions;

export default invoicesSlice.reducer;
