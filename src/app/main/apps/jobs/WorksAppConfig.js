import { lazy } from "react";
import { Redirect } from "react-router-dom";

const WorksAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/apps/jobs/new-job",
      component: lazy(() => import("./add-work/AddWork")),
    },
    // {
    //   path: "/apps/jobs/:id",
    //   component: lazy(() => import("./")),
    // },
    {
      path: "/apps/jobs/all",
      component: lazy(() => import("./works/Works")),
    },
    {
      path: "/apps/jobs",
      component: () => <Redirect to="/apps/jobs/all" />,
    },
  ],
};

export default WorksAppConfig;
