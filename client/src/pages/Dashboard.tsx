import { ITableTabInfo } from "../utilities/types";
import ApprovalList from "./Users/ApprovalList";
import FormTable from "../components/FormTable";

const tableTab: ITableTabInfo[] = [
  { label: "REGISTRATION", formPages: <ApprovalList /> },
];

const Dashboard = () => {
  return <FormTable tableTab={tableTab} />;
};

export default Dashboard;
