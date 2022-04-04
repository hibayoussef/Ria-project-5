import { lazy } from "react";
import { Redirect } from "react-router-dom";

const JobsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/apps/jobs/:id",
      component: lazy(() => import("./JobsApp")),
    },
    {
      path: "/apps/jobs",
      component: () => <Redirect to="/apps/jobs/all" />,
    },
  ],
};

export default JobsAppConfig;
