import { ITableTabInfo } from "../../utilities/types";
import Approval from "./ApprovalList";
import Approved from "./ApprovedList";
import Disapproved from "./DisapprovedList";
import FormTable from "../../components/FormTable";

const tableTab: ITableTabInfo[] = [
  { label: "APPROVAL", formPages: <Approval /> },
  { label: "APPROVED", formPages: <Approved /> },
  { label: "DISAPPROVED", formPages: <Disapproved /> },
];

const Reviews = () => {
  return <FormTable tableTab={tableTab} />;
};

export default Reviews;
