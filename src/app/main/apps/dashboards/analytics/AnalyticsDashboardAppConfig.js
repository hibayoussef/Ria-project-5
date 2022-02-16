import { authRoles } from "app/auth";
import { lazy } from "react";

const AnalyticsDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: authRoles.super_admin,
      path: "/apps/dashboards/analytics",
      component: lazy(() => import("./AnalyticsDashboardApp")),
    },
  ],
};

export default AnalyticsDashboardAppConfig;
