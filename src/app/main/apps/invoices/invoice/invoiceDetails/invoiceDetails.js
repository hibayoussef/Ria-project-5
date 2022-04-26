import React from "react";
import { getInvoice } from "../../store/invoiceSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { useTheme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TodayIcon from "@material-ui/icons/Today";
import { makeStyles } from "@material-ui/core/styles";
import { pdfjs } from "react-pdf";
import Button from "@material-ui/core/Button";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import clsx from "clsx";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import RejectDialog from "./rejectDialog";

const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge",
];

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

const InvoiceDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const breakpoint = theme.breakpoints.down("sm");
  const routeParams = useParams();
  const [invoice, setInvoice] = useState([]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    getInvoice(routeParams).then((response) => {
      setInvoice(response);
    });
  }, []);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  console.log("invoice url: ", invoice?.file?.url);
  console.log("invoice tara : ", invoice);

  return (
    <>
      <Grid container>
        <Grid item xs={7} sm={7}>
          {/* pdf viewer */}
          <object
            // data={invoice?.file?.url}
            data="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Alternative text - include a link{" "}
              <a href="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf">
                to the PDF!
              </a>
            </p>
          </object>
        </Grid>

        <Grid item xs={5} sm={5} style={{ padding: "3rem" }}>
          <Grid item>
            <h1 style={{ fontWeight: "bold" }}>Invoice Details</h1>
          </Grid>

          <Grid item style={{ marginTop: "3rem", marginBottom: "2rem" }}>
            <Grid item style={{ marginBottom: 10 }}>
              <h3>From</h3>
            </Grid>
            <Grid item>
              <h3>{invoice?.submittedBy?.name || ""}</h3>
            </Grid>
            <Grid item>
              <h3>{invoice?.submittedBy?.email || ""}</h3>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Invoice ID</h3>
              </Grid>
              <Grid item xs={9} sm={9}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={invoice.id || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Issue Date</h3>
              </Grid>
              <Grid item xs={9} sm={9}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={
                    moment(moment.utc(invoice.issueDate).toDate())
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss") || ""
                  }
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <TodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Due Date</h3>
              </Grid>
              <Grid item xs={9} sm={9}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={
                    moment(moment.utc(invoice.dueDate).toDate())
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss") || ""
                  }
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <TodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Net Amount</h3>
              </Grid>
              <Grid item xs={9} sm={9}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={invoice.netAmount || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Tax Number</h3>
              </Grid>
              <Grid item xs={9} sm={9}>
                <TextField
                  className="mt-8 mb-16"
                  id="outlined-size-normal"
                  value={invoice.taxNumber || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item direction={breakpoint ? "row" : "column"}>
              <Grid
                container
                item
                xs={3}
                sm={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Gross Amount</h3>
              </Grid>
              <Grid item xs={9} sm={9}>
                <TextField
                  className="mt-8 mb-16"
                  // label="Size"
                  id="outlined-size-normal"
                  value={invoice.grossAmount || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item style={{ paddingRight: "1rem" }}>
                {/* <Button
                  onClick={(ev) => {
                    dispatch(rejectInvoice(invoice?.id));
                    rejectInvoiceHandleClick(ev);
                  }}
                  variant="contained"
                  style={{
                    paddingLeft: "2.4rem",
                    paddinRight: "2.4rem",
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    backgroundColor: "#dc3c24",
                    color: "#FFFFFF",
                    borderRadius: 4,
                  }}
                >
                  Reject Invoice
                </Button> */}
                <RejectDialog id={invoice?.id} />
              </Grid>

              <Grid item>
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  ref={anchorRef}
                  aria-label="split button"
                >
                  <Button onClick={handleClick}>
                    {options[selectedIndex]}
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu">
                            {options.map((option, index) => (
                              <MenuItem
                                key={option}
                                disabled={index === 2}
                                selected={index === selectedIndex}
                                onClick={(event) =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
