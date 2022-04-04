import FuseUtils from "@fuse/utils/FuseUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import _ from "@lodash";
import * as yup from "yup";

import {
  removeContact,
  updateJob,
  addJob,
  closeNewJobDialog,
  closeEditJobDialog,
} from "./store/jobsSlice";

const defaultValues = {
  id: "",
  name: "",
  lastName: "",
  avatar: "assets/images/avatars/profile.jpg",
  nickname: "",
  company: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  notes: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

function JobDialog(props) {
  const dispatch = useDispatch();
  const jobDialog = useSelector(({ jobsApp }) => jobsApp.jobs.jobDialog);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const updateJobHandleClick = () => {
    enqueueSnackbar(
      "Job Updated successfully",
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

  const addJobHandleClick = () => {
    enqueueSnackbar(
      "Job added successfully",
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

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const id = watch("id");
  const name = watch("name");
  const descrition = watch("descrition");

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (jobDialog.type === "edit" && jobDialog.data) {
      reset({ ...jobDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (jobDialog.type === "new") {
      reset({
        ...defaultValues,
        ...jobDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [jobDialog.data, jobDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (jobDialog.props.open) {
      initDialog();
    }
  }, [jobDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return jobDialog.type === "edit"
      ? dispatch(closeEditJobDialog())
      : dispatch(closeNewJobDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (jobDialog.type === "new") {
      dispatch(addJob(data));
    } else {
      dispatch(updateJob({ ...jobDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...jobDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0} style={{ padding: "1rem" }}>
        <Toolbar className="flex w-full">
          <Typography variant="h6" color="inherit">
            {jobDialog.type === "new" ? "Create New Job" : "Edit Job Details"}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24 pt-20">
          {/* <Avatar className="w-96 h-96" alt="contact avatar" src={avatar} /> */}
          <Icon
            // component={motion.span}
            // initial={{ scale: 0 }}
            // animate={{ scale: 1, transition: { delay: 0.2 } }}
            style={{ fontSize: "7rem" }}
            className="text-40 md:text-40"
          >
            work
          </Icon>
          {/* {contactDialog.type === "edit" && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )} */}
        </div>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden pt-24"
        style={{ padding: "1rem" }}
      >
        <DialogContent classes={{ root: "p-24" }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Name"
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">description</Icon>
            </div>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="description"
                  id="description"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {jobDialog.type === "new" ? (
          <DialogActions
            className="justify-between p-4 pb-16"
            style={{ padding: "1rem" }}
          >
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                onClick={(ev) => {
                  ev.stopPropagation();
                  addJobHandleClick(ev);
                }}
                // className={classes.button2}
                style={{ color: "green", border: "none" }}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions
            className="justify-between p-4 pb-16"
            style={{ padding: "1rem" }}
          >
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                onClick={(ev) => {
                  ev.stopPropagation();
                  updateJobHandleClick(ev);
                }}
                // className={classes.button2}
                style={{ color: "green", border: "none" }}
              >
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default JobDialog;
