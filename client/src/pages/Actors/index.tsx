import ActorAdd from "./ActorAdd";
import ActorList from "./ActorList";
import FormTable from "../../components/FormTable";

interface TableTabInfo {
  label: string;
  formPages: JSX.Element;
}

const tableTab: TableTabInfo[] = [
  { label: "ACTORS", formPages: <ActorList /> },
  { label: "ADD", formPages: <ActorAdd /> },
];

const Actors = () => {
  return <FormTable tableTab={tableTab} />;
};

export default Actors;
