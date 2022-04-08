import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";

export const getSalaryScale = createAsyncThunk(
  "salaryScalesApp/salaryScale/getSalaryScale",
  async (id) => {
    const response = await axios.get(`/salary-scales/${id}`);
    const data = await response.data;
    console.log("salary Scale data: ", data);
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "salaryScalesApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().salaryScalesApp.salaryScale;
    await axios.post("/api/e-commerce-app/remove-product", { id });

    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "salaryScalesApp/product/saveProduct",
  async (productData, { dispatch, getState }) => {
    const { product } = getState().salaryScalesApp;

    const response = await axios.post("/api/e-commerce-app/product/save", {
      ...product,
      ...productData,
    });
    const data = await response.data;

    return data;
  }
);

const salaryScaleSlice = createSlice({
  name: "salaryScalesApp/salaryScale",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: "",
          handle: "",
          description: "",
          categories: [],
          tags: [],
          images: [],
          priceTaxExcl: 0,
          priceTaxIncl: 0,
          taxRate: 0,
          comparedPrice: 0,
          quantity: 0,
          sku: "",
          width: "",
          height: "",
          depth: "",
          weight: "",
          extraShippingFee: 0,
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getSalaryScale.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = salaryScaleSlice.actions;

export default salaryScaleSlice.reducer;
