import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob } from "./store/jobsSlice";
import JobsMultiSelectMenu from "./JobsMultiSelectMenu";
import JobsTable from "./JobsTable";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import {
  openEditJobDialog,
  removeContact,
  toggleStarredContact,
  selectJobs,
} from "./store/jobsSlice";
import { useSnackbar } from "notistack";

const useStyles = makeStyles({
  button1: {
    backgroundColor: "none",
    "&:hover": {
      backgroundColor: "#43a047",
      color: "#e8e4e4",
      transition: "0.3s",
      borderColor: "#43a047",
    },
  },
  button2: {
    backgroundColor: "none",
    "&:hover": {
      backgroundColor: "#e53935",
      color: "#e8e4e4",
      transition: "0.3s",
      borderColor: "#e53935",
    },
  },
});

// const onRejectUser = useCallback((id) => {
//   dispatch(rejectUser(id));
// }, []);

function JobsList(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const contacts = useSelector(selectJobs);
  const searchText = useSelector(({ jobsApp }) => jobsApp.jobs.searchText);
  const user = useSelector(({ jobsApp }) => jobsApp.user);
  const { selectedJobsIds } = props;

  const [filteredData, setFilteredData] = useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar(
      "User accepted",
      { variant: "success" },
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      },
      { TransitionComponent: Slide }
    );
  };

  const deleteJobHandleClick = () => {
    enqueueSnackbar(
      "Job Deleted successfully",
      { variant: "error" },
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      },
      { TransitionComponent: Slide }
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        className: "font-medium",
        sortable: true,
        align: "left",
      },
      {
        Header: "Job Title",
        accessor: "name",
        className: "font-medium",
        sortable: true,
        align: "center",
      },
      {
        Header: "Description",
        accessor: "description",
        sortable: true,
        align: "center",
      },

      {
        id: "action",
        // width: 128,
        align: "right",
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {/* <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                dispatch(approveUser(row.original.id));
                dispatch(toggleStarredContact(row.original.id));
                handleClick(ev);
                dispatch(toggleStarredContact(row.original.id));
              }}
              style={{ color: "green", border: "none" }}
            >
              <Icon>edit</Icon>
            </IconButton> */}
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                dispatch(deleteJob(row.original.id));
                deleteJobHandleClick(ev);
              }}
              // className={classes.button2}
              style={{ color: "red", border: "none" }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        ),
      },
    ],
    [dispatch, user.starred]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no Jobs!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
    >
      <JobsTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditJobDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default JobsList;
