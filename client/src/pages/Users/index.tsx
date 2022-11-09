import ApprovalList from "./ApprovalList";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import FormTable from "../../components/FormTable";

interface TableTabInfo {
  label: string;
  formPages: JSX.Element;
}

const tableTab: TableTabInfo[] = [
  { label: "USER", formPages: <UserList /> },
  { label: "ADD", formPages: <UserAdd /> },
  { label: "APPROVAL", formPages: <ApprovalList /> },
];

const Users = () => {
  return <FormTable tableTab={tableTab} />;
};

export default Users;
