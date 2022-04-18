import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getSalaryScales = createAsyncThunk(
  "salaryScalesApp/salaryScales/getSalaryScales",
  async () => {
    const response = await axios.get("/salary-scales");
    const data = await response.data.data;
    console.log("salary scales data: ", data);
    return data;
  }
);

export const getJobs = async () => {
  const response = await axios.get("/jobs");
  return response.data.data;
};

export const removeProducts = createAsyncThunk(
  "salaryScalesApp/products/removeProducts",
  async (productIds, { dispatch, getState }) => {
    await axios.post("/api/e-commerce-app/remove-products", { productIds });

    return productIds;
  }
);

const salaryScalesAdapter = createEntityAdapter({});

export const {
  selectAll: selectSalaryScales,
  selectById: selectSalaryScaleById,
} = salaryScalesAdapter.getSelectors(
  (state) => state.salaryScalesApp.salaryScales
);

const salaryScalesSlice = createSlice({
  name: "salaryScalesApp/salaryScales",
  initialState: salaryScalesAdapter.getInitialState({
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
    [getSalaryScales.fulfilled]: salaryScalesAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      salaryScalesAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = salaryScalesSlice.actions;

export default salaryScalesSlice.reducer;
