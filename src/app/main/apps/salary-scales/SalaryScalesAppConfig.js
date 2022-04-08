import { lazy } from "react";
import { Redirect } from "react-router-dom";

const SalaryScalesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/salary-scales-section/salary-scales/:salaryScaleId",
      component: lazy(() => import("./salaryScale/SalaryScale")),
    },
    {
      path: "/apps/salary-scales-section/salary-scales",
      component: lazy(() => import("./salaryScales/SalaryScales")),
    },

    {
      path: "/apps/salary-scale-section",
      component: () => (
        <Redirect to="/apps/salary-scales-section/salary-scales" />
      ),
    },
  ],
};

export default SalaryScalesAppConfig;
