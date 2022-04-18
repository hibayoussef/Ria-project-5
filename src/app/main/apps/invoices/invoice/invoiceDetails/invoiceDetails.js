import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../../store/invoiceSlice";
import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "@fuse/hooks";
import { Link, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import { useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TodayIcon from "@material-ui/icons/Today";

const InvoiceDetails = () => {
  const theme = useTheme();
  const breakpoint = theme.breakpoints.down("sm");
  const routeParams = useParams();
  // const invoice = useSelector(({ invoicesApp }) => invoicesApp.invoice);
  // console.log("invoice details: ", invoice);
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    getInvoice(routeParams).then((response) => {
      setInvoice(response);
    });
  }, []);

  console.log("invoice tara : ", invoice);

  return (
    <>
      <Grid container>
        <Grid item xs={7} sm={7} style={{ backgroundColor: "red" }}>
          jjjj
        </Grid>
        <Grid item xs={5} sm={5} style={{ padding: "3rem" }}>
          <Grid item>
            <h1 style={{ fontWeight: "bold" }}>Invoice Details</h1>
          </Grid>

          {/* <div className="flex -mx-4"> */}

          {/* </div> */}
          {/* submitted By */}
          <Grid item style={{ marginTop: "3rem", marginBottom: "2rem" }}>
            <Grid item style={{ marginBottom: 10 }}>
              <h3>From</h3>
            </Grid>
            <Grid item>
              <h3>{invoice?.submittedBy?.name}</h3>
            </Grid>
            <Grid item>
              <h3>{invoice?.submittedBy?.email}</h3>
            </Grid>
          </Grid>
          {/* end submitted by */}
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
                  value={invoice.id}
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
                  value={moment(moment.utc(invoice.issueDate).toDate())
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss")}
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
                  value={moment(moment.utc(invoice.dueDate).toDate())
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss")}
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
                  value={invoice.netAmount}
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
                  value={invoice.taxNumber}
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
                  value={invoice.grossAmount}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
