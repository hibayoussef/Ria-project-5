import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDepartements } from "./departementsSlice";

export const getDepartement = createAsyncThunk(
  "departementsApp/departement/getDepartement",
  async (params) => {
    const response = await axios.get(`/departments/${params.departementId}`);
    const data = await response.data.data;

    return data === undefined ? null : data;
  }
);

export const getUsers = async () => {
  const response = await axios.get("/users/for-admin");
  console.log("get Users response:  ", response);
  return response.data.data;
};

export const addUserToDepartement = createAsyncThunk(
  "departementsApp/departement/AddUserToDepartement",
  async ({ departmentId, usersIds }, { dispatch }) => {
    console.log("hi in new function");
    console.log("invoiceId, userId, message", departmentId, usersIds);
    const response = await axios
      .post(`/departments/${departmentId}/add-user-to-departments`, {
        usersIds,
      })
      .catch((error) => {
        console.log("error response: ", error);
      });
    const data = await response.data.data;
    console.log("add-user-to-departments: ", data);

    // dispatch(getInvoice(data?.id));
    dispatch(getInvoices());
    return data;
  }
);

export const addDepartement = createAsyncThunk(
  "departementsApp/departements/addDepartement",
  async ({ title, maxNumberOfEmployees }, { dispatch, getState }) => {
    console.log("backend-1-departement: ", title, maxNumberOfEmployees);
    const response = await axios.post("/departments", {
      title,
      maxNumberOfEmployees,
    });
    console.log("response: ", response);

    const data = await response.data.data;
    console.log("Hi I am Here in add new invoice: ", data);
    dispatch(getDepartements());

    return data;
  }
);

const departementSlice = createSlice({
  name: "departementsApp/departement",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getDepartement.fulfilled]: (state, action) => action.payload,
    [addDepartement.fulfilled]: (state, action) => action.payload,
    [addUserToDepartement.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = departementSlice.actions;

export default departementSlice.reducer;
