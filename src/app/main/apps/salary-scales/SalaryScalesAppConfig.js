import { lazy } from "react";
import { Redirect } from "react-router-dom";

const SalaryScalesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/e-commerce/products/:productId/:productHandle?",
      component: lazy(() => import("./salary-scale/SalaryScale")),
    },
    {
      path: "/apps/e-commerce/products",
      component: lazy(() => import("./salary-scales/SalaryScales")),
    },

    {
      path: "/apps/e-commerce",
      component: () => <Redirect to="/apps/e-commerce/products" />,
    },
  ],
};

export default SalaryScalesAppConfig;
