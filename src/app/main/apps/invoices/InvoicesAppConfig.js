import { lazy } from "react";
import { Redirect } from "react-router-dom";

const InvoicesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/e-commerce/products/:productId/:productHandle?",
      component: lazy(() => import("./invoice/Invoice")),
    },
    {
      path: "/apps/e-commerce/products",
      component: lazy(() => import("./invoices/Invoices")),
    },

    {
      path: "/apps/e-commerce",
      component: () => <Redirect to="/apps/e-commerce/products" />,
    },
  ],
};

export default InvoicesAppConfig;
