import { lazy } from "react";
import { Redirect } from "react-router-dom";

const InvoicesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/invoices-section/invoices/:invoiceId",
      component: lazy(() => import("./invoice/invoiceDetails/details")),
    },
    {
      path: "/apps/invoices-section/invoices",
      component: lazy(() => import("./invoices/Invoices")),
    },

    {
      path: "/apps/invoices-section",
      component: () => <Redirect to="/apps/invoices-section/invoices" />,
    },
  ],
};

export default InvoicesAppConfig;
