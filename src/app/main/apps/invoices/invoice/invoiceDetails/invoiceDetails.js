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
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import embed from "pdf-embed";

pdfjs.GlobalWorkerOptions.workerSrc = `'//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    getInvoice(routeParams).then((response) => {
      setInvoice(response);
    });
  }, []);

  console.log("invoice url: ", invoice?.file?.url);
  console.log("invoice tara : ", invoice);

  return (
    <>
      <Grid container>
        <Grid item xs={7} sm={7}>
          {/* pdf viewer */}
          <object
            // data={invoice?.file?.url}
            data="https://ite-ria.herokuapp.com/api/v1/public/invoices-files/invoice-1-e7a2a1ad-b6cf-4733-b80e-b158478b85fa.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Alternative text - include a link{" "}
              <a href={invoice?.file?.url}>to the PDF!</a>
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
