import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getMyLeaves = createAsyncThunk(
  "leavesApp/leaves/getMyLeaves",
  async (id) => {
    console.log("iddd: ", id);
    const response = await axios.get("/leaves", { id });
    const data = await response.data.data;
    console.log("leaves from backend My Leaves:", data);

    return data;
  }
);

const myLeavesAdapter = createEntityAdapter({});

export const { selectAll: selectMyLeaves, selectById: selectMyLeaveById } =
  myLeavesAdapter.getSelectors((state) => state.leavesApp.myLeaves);

const leavesSlice = createSlice({
  name: "leavesApp/leaves",
  initialState: myLeavesAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setOrdersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getMyLeaves.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      const data = payload;
      console.log("data approval: ", data);
      myLeavesAdapter.setAll(state, data);
    },
  },
});

export const { setOrdersSearchText } = leavesSlice.actions;

export default leavesSlice.reducer;
