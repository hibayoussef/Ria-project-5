import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import ApprovalLeavesHeader from "./ApprovalLeavesHeader";
import ApprovalLeavesTable from "./ApprovalLeavesTable";

function ApprovalLeaves() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<ApprovalLeavesHeader />}
      content={<ApprovalLeavesTable />}
      innerScroll
    />
  );
}

export default withReducer("leavesApp", reducer)(ApprovalLeaves);
