import { ITableTabInfo } from "../../utilities/types";
import ApprovalList from "./ApprovalList";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import FormTable from "../../components/FormTable";

const tableTab: ITableTabInfo[] = [
  { label: "USERS", formPages: <UserList /> },
  { label: "ADD", formPages: <UserAdd /> },
  { label: "APPROVAL", formPages: <ApprovalList /> },
];

const Users = () => {
  return <FormTable tableTab={tableTab} />;
};

export default Users;
