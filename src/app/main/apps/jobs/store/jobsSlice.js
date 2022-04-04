import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getUserData } from "./userSlice";

export const getJobs = createAsyncThunk("jobsRequests/getJobs", async () => {
  const response = await axios.get("/jobs");
  const jobsRequestsData = await response.data.data;
  console.log("Response: ", jobsRequestsData);
  return jobsRequestsData;
});

// reject user
export const deleteJob = createAsyncThunk(
  "jobsRequests/deleteJob",
  async (id, { dispatch }) => {
    const response = await axios.delete(`/jobs/${id}`).catch((error) => {
      console.log("error response: ", error);
    });
    const data = await response.data.data;
    dispatch(getJobs());
    return data;
  }
);

export const updateJob = createAsyncThunk(
  "jobsApp/jobs/updateJob",
  async (job, { dispatch, getState }) => {
    console.log("Hi I am here, job: ", job);
    const response = await axios.put(`/jobs/${job.id}`, job);
    console.log("response inside called data:", response);
    const data = await response.data.data;
    console.log("data: ", data);
    dispatch(getJobs());

    return data;
  }
);

export const addJob = createAsyncThunk(
  "jobsApp/jobs/addJob",
  async (job, { dispatch, getState }) => {
    const response = await axios.post("/jobs", job);
    const data = await response.data.data;
    console.log("Hi I am Here in add new Job: ", data);
    dispatch(getJobs());

    return data;
  }
);

export const updateContact = createAsyncThunk(
  "jobsApp/jobs/updateJob",
  async (contact, { dispatch, getState }) => {
    const response = await axios.post("/api/contacts-app/update-contact", {
      contact,
    });
    const data = await response.data;

    dispatch(getContacts());

    return data;
  }
);

export const toggleStarredContact = createAsyncThunk(
  "contactsApp/contacts/toggleStarredContact",
  async (contactId, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/toggle-starred-contact",
      { contactId }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

// approve user
export const approveUser = createAsyncThunk(
  "jobsRequests/approve",
  async (id, { dispatch }) => {
    const response = await axios
      .post(`/auth-for-admin/approve-user/${id}`)
      .catch((err) => console.log(err));
    const data = await response.data.data;

    dispatch(getUsersRequests());
    console.log("user approve inside Slice: ", data);

    return data;
  }
);

export const addContact = createAsyncThunk(
  "contactsApp/contacts/addContact",
  async (job, { dispatch, getState }) => {
    const response = await axios.post("/api/contacts-app/add-contact", {
      contact,
    });
    const data = await response.data;

    dispatch(getContacts());

    return data;
  }
);

export const removeContact = createAsyncThunk(
  "contactsApp/contacts/removeContact",
  async (contactId, { dispatch, getState }) => {
    await axios.post("/api/contacts-app/remove-contact", { contactId });

    return contactId;
  }
);

export const removeContacts = createAsyncThunk(
  "contactsApp/contacts/removeContacts",
  async (contactIds, { dispatch, getState }) => {
    await axios.post("/api/contacts-app/remove-contacts", { contactIds });

    return contactIds;
  }
);

export const toggleStarredContacts = createAsyncThunk(
  "contactsApp/contacts/toggleStarredContacts",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/toggle-starred-contacts",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsStarred = createAsyncThunk(
  "contactsApp/contacts/setContactsStarred",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/set-contacts-starred",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsUnstarred = createAsyncThunk(
  "contactsApp/contacts/setContactsUnstarred",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/set-contacts-unstarred",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

const jobsAdapter = createEntityAdapter({});

export const { selectAll: selectJobs, selectById: selectJobsById } =
  jobsAdapter.getSelectors((state) => state.jobsApp.jobs);

const jobsSlice = createSlice({
  name: "jobsApp/jobs",
  initialState: jobsAdapter.getInitialState({
    jobs: [],
    jobDeleted: null,
    searchText: "",
    status: null,
    routeParams: {},
    jobDialog: {
      type: "new",
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    openEditJobDialog: (state, action) => {
      state.jobDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditJobDialog: (state, action) => {
      state.jobDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },

    openNewJobDialog: (state, action) => {
      state.jobDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewJobDialog: (state, action) => {
      state.jobDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateJob.fulfilled]: jobsAdapter.upsertOne,
    [addJob.fulfilled]: jobsAdapter.addOne,
    // [removeContacts.fulfilled]: (state, action) =>
    //   contactsAdapter.removeMany(state, action.payload),
    // [removeContact.fulfilled]: (state, action) =>
    //   contactsAdapter.removeOne(state, action.payload),

    [getJobs.fulfilled]: (state, action) => {
      // const { data, routeParams } = action.payload;
      console.log("inside fullfilled 1: ", action.payload);
      console.log("inside full filled 3:", state);
      jobsAdapter.setAll(state, action.payload);
      // state.routeParams = routeParams;
      // console.log("inside full filled 2:", state.routeParams);
      state.searchText = "";
    },

    [deleteJob.pending]: (state) => {
      state.jobDeleted = "loading delete";
    },
    [deleteJob.fulfilled]: (state, action) => {
      state.approve = "success delete";
      jobsAdapter.removeOne(state, action.payload);
    },
    [deleteJob.rejected]: (state) => {
      state.approve = "failed reject";
    },
    // [approveUser.pending]: (state) => {
    //   state.approve = "loading approve";
    // },
    // [approveUser.fulfilled]: (state, action) => {
    //   state.approve = "success approve";
    //   jobsAdapter.addOne;
    // },
    // [approveUser.rejected]: (state) => {
    //   state.approve = "failed approve";
    // },
  },
});

export const {
  setContactsSearchText,
  openNewJobDialog,
  closeNewJobDialog,
  openEditJobDialog,
  closeEditJobDialog,
} = jobsSlice.actions;

export default jobsSlice.reducer;
