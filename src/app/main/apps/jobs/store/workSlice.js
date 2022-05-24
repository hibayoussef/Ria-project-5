import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getWorks } from "./worksSlice";


export const addWork = createAsyncThunk(
  "worksApp/works/addWork",
  async (work, { dispatch, getState }) => {
    console.log("asssss: ", work);
    const response = await axios.post("/jobs", work);
    const data = await response.data.data;
    console.log("Hi I am Here in add new Job: ", data);
    dispatch(getWorks());

    return data;
  }
);



export const removeWork = createAsyncThunk(
  "worksRequests/deleteWork",
  async (id, { dispatch }) => {
    console.log('id:', id)
    const response = await axios.delete(`/jobs/${id}`)
    console.log('response: ', response )
    const data = await response.data.data;
    dispatch(getWorks());
    return data;
  }
);



const workSlice = createSlice({
  name: "worksApp/work",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [addWork.fulfilled]: (state, action) => action.payload,
    [removeWork.fulfilled]: (state, action) => action.payload
  },
});

export const { resetOrder } = workSlice.actions;

export default workSlice.reducer;
