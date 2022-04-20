const Picker = () => {
  const [issueDate, setIssueDate] = useState(new Date("2014-08-18T21:11:54"));

  const handleissueDateChange = (date) => {
    setIssueDate(date);
  };
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="flex -mx-4">
          <KeyboardDatePicker
            inputVariant="outlined"
            className="mt-8 mb-16 ml-6"
            margin="normal"
            id="date-picker-dialog"
            label="Issue Date"
            format="MM/dd/yyyy"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={issueDate}
            onChange={handleissueDateChange}
          />
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default Picker;
