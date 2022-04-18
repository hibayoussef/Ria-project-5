import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getJobs } from "../../store/salaryScalesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";

function ShippingTab(props) {
  const methods = useFormContext();
  const { control } = methods;

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
    </div>
  );
}

export default ShippingTab;

const employeeLevels = [
  { employeeLevel: "senior" },
  { employeeLevel: "junior" },
  { employeeLevel: "mid_level" },
];
