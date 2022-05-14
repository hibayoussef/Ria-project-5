import { lazy } from "react";
import { Redirect } from "react-router-dom";

const LeavesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/e-commerce/leaves/:orderId",
      component: lazy(() => import("./leave/Leave")),
    },
    {
      path: "/apps/e-commerce/orders",
      component: lazy(() => import("./leaves/Leaves")),
    },
    {
      path: "/apps/e-commerce",
      component: () => <Redirect to="/apps/e-commerce/products" />,
    },
  ],
};

export default LeavesAppConfig;
