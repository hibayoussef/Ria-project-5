import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getJobs } from "../../store/salaryScalesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { motion } from "framer-motion";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import { addSalaryScale } from "../../store/salaryScaleSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    // padding: theme.spacing(4),
  },
}));

function ShippingTab(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control } = methods;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCreateSalaryScaleMessageClick = () => {
    enqueueSnackbar(
      "Salary Scale has been created successfully",
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

  useEffect(() => {
    getJobs();
  }, []);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then((response) => setJobs(response));
  }, []);

  console.log("jobs: ", jobs);

  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          name="job"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="combo-box-demo"
              style={{ width: 900 }}
              className="mt-8 mb-16"
              options={jobs || []}
              getOptionLabel={(option) => option.name || ""}
              value={value}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // type="number"
                  placeholder="Select Job Name"
                  label="Job"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="employeeLevel"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="employeeLevel"
              style={{ width: 900 }}
              className="mt-8 mb-16 mx-4"
              options={employeeLevels || []}
              getOptionLabel={(option) => option.employeeLevel || ""}
              value={value}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Employee Level"
                  label="Employee Level"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              className="mt-8 mb-16"
              label="Amount"
              id="amount"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              fullWidth
            />
          )}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Grid
          container
          direction="row-reverse"
          justifyContent="flex-start"
          alignItems="flex-end"
          style={{
            paddingTop: "11rem",
          }}
        >
          <Grid item>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              style={{
                padding: "1rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
              // onClick={handleRemoveProduct}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              style={{
                padding: "1rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
              onClick={(ev) => {
                dispatch(addSalaryScale());
                ev.stopPropagation();
                handleCreateSalaryScaleMessageClick(ev);
              }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </motion.div>
    </div>
  );
}

export default ShippingTab;

const employeeLevels = [
  { employeeLevel: "senior" },
  { employeeLevel: "junior" },
  { employeeLevel: "mid_level" },
];
