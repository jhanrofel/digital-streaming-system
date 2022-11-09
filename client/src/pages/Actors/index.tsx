import { ITableTabInfo } from "../../utilities/types";
import ActorAdd from "./ActorAdd";
import ActorList from "./ActorList";
import FormTable from "../../components/FormTable";

const tableTab: ITableTabInfo[] = [
  { label: "ACTORS", formPages: <ActorList /> },
  { label: "ADD", formPages: <ActorAdd /> },
];

const Actors = () => {
  return <FormTable tableTab={tableTab} />;
};

export default Actors;
