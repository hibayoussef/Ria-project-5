import { lazy } from "react";
import { Redirect } from "react-router-dom";

const ReceiptsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/e-commerce/products",
      component: lazy(() => import("./receipts/Receipts")),
    },
    {
      path: "/apps/e-commerce/orders/:orderId",
      component: lazy(() => import("./receipt/Receipt")),
    },

    {
      path: "/apps/e-commerce",
      component: () => <Redirect to="/apps/e-commerce/products" />,
    },
  ],
};

export default ReceiptsAppConfig;
