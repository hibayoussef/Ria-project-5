import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetInvoice, newInvoice } from "../store/invoiceSlice";
import reducer from "../store";
import InvoiceHeader from "./InvoiceHeader";
import ProductImagesTab from "./tabs/ProductImagesTab";
import ShippingTab from "./tabs/ShippingTab";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required("You must enter a product name")
    .min(5, "The product name must be at least 5 characters"),
});

function Invoice(props) {
  const dispatch = useDispatch();
  // const invoice = useSelector(({ invoicesApp }) => invoicesApp.invoice);

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noInvoice, setNoInvoice] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateInvoiceState() {
      const { invoiceId } = routeParams;

      console.log("invoice id: ", invoiceId);
      console.log("route params: ", routeParams);
      if (invoiceId === "new") {
        /**
         * Create New Product data
         */
        dispatch(newInvoice());
      } else {
        /**
         * Get Product data
         */
        // dispatch(getProduct(routeParams)).then((action) => {
        /**
         * If the requested product is not exist show message
         */
        // if (!action.payload) {
        //   setNoInvoice(true);
        // }
        // });
      }
    }

    updateInvoiceState();
  }, [dispatch, routeParams]);

  // useEffect(() => {
  //   if (!invoice) {
  //     return;
  //   }
  /**
   * Reset the form on product state changes
   */
  //   reset(invoice);
  // }, [invoice, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetInvoice());
      setNoInvoice(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noInvoice) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such Invoice!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/invoices-section/invoices"
          color="inherit"
        >
          Go to Invoices Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (invoice &&
  //     routeParams.invoiceId !== invoice.id &&
  //     routeParams.invoiceId !== "new")
  // ) {
  //   return <FuseLoading />;
  // }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<InvoiceHeader />}
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64" }}
          >
            <Tab className="h-64" label="Invoice information" />
            <Tab className="h-64" label="Invoice file" />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <div className={tabValue !== 0 ? "hidden" : ""}>
              <ShippingTab />
            </div>

            <div className={tabValue !== 1 ? "hidden" : ""}>
              <ProductImagesTab />
            </div>
          </div>
        }
        innerScroll
      />
    </FormProvider>
  );
}

export default withReducer("invoicesApp", reducer)(Invoice);
