import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import JobsHeader from "./JobsHeader";
import JobsList from "./JobsList";
import reducer from "./store";
import { getJobs } from "./store/jobsSlice";
import { getUserData } from "./store/userSlice";
import JobDialog from "./JobDialog";
import FusePageCarded from "@fuse/core/FusePageCarded";

function JobsApp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    dispatch(getJobs());
    dispatch(getUserData());
  }, [dispatch, routeParams]);

  return (
    <>
      <FusePageCarded
        classes={{
          content: "flex",
          // contentWrapper: "p-0 sm:p-24 h-full",
          content: "flex flex-col h-full",
          leftSidebar: "w-256 border-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
          wrapper: "min-h-0",
        }}
        header={<JobsHeader pageLayout={pageLayout} />}
        content={<JobsList />}
        innerScroll
      />
      <JobDialog />

      {/* <FusePageSimple
        classes={{
          contentWrapper: "p-0 sm:p-24 h-full",
          content: "flex flex-col h-full",
          leftSidebar: "w-256 border-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
          wrapper: "min-h-0",
        }}
        header={<JobsHeader pageLayout={pageLayout} />}
        content={<JobsList />}
        // leftSidebarContent={<ContactsSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <JobDialog /> */}
    </>
  );
}

export default withReducer("jobsApp", reducer)(JobsApp);
