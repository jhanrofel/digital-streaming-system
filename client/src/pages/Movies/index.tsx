import { ITableTabInfo } from "../../utilities/types";
import Categories from "./Categories";
import MovieAdd from "./MovieAdd";
import MovieList from "./MovieList";
import FormTable from "../../components/FormTable";

const tableTab: ITableTabInfo[] = [
  { label: "MOVIES", formPages: <MovieList /> },
  { label: "ADD", formPages: <MovieAdd /> },
  { label: "CATEGORY", formPages: <Categories /> },
];

const Movies = () => {
  return <FormTable tableTab={tableTab} />;
};

export default Movies;
