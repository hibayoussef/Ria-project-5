import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function ShippingTab(props) {
  const methods = useFormContext();
  const { control } = methods;

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2022-04-16T11:44:40")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          control={control}
          name="dueDate"
          render={() => (
            <KeyboardDatePicker
              inputVariant="outlined"
              className="mt-8 mb-16"
              margin="normal"
              id="date-picker-dialog"
              label="Due Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="issueDate"
          render={() => (
            <KeyboardDatePicker
              inputVariant="outlined"
              className="mt-8 mb-16 ml-6"
              margin="normal"
              id="date-picker-dialog"
              label="Issue Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          )}
        />
      </div>

      <Controller
        name="netAmount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Net Amount"
            id="extraShippingFee"
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

      <Controller
        name="taxNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Tax Number"
            id="extraShippingFee"
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

      <Controller
        name="grossAmount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Gross Amount"
            id="extraShippingFee"
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
  );
}

export default ShippingTab;
