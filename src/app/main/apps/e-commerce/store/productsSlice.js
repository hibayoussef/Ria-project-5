import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "eCommerceApp/products/getProducts",
  async () => {
    const response = await axios.get("/api/e-commerce-app/products");
    const data = await response.data;

    return data;
  }
);

export const getAllReceipts = createAsyncThunk(
  "eCommerceApp/products/getAllReceipts",
  async () => {
    const response = await axios.get("financial/receipts/by-admin");
    console.log("response: ", response);
    const data = response.data.data;
    console.log("data: ", data);
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

export const removeReceipt = createAsyncThunk(
  "contactsApp/contacts/removeReceipts",
  async (receiptId, { dispatch, getState }) => {
    await axios.post(`/financial/receipts/${receiptId}`);
    console.log("deleted");
    return contactId;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: "eCommerceApp/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [getAllReceipts.fulfilled]: productsAdapter.setAll,
    // [getAllReceipts.fulfilled]: (state, action) => {
    //   const data = action.payload;
    //   productsAdapter.setAll(state, data);
    //   state.searchText = "";
    //   console.log("innnnnn: ", data);
    // },
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
    [removeReceipt.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
    // productsAdapter.removeOne(state, action.payload),

    // contactsAdapter.removeOne(state, action.payload);
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
