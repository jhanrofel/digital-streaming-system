import React from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { moviesLatestUploads } from "../../utilities/slice/movieSlice";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormImageList from "../../components/FormImageList";
import FormSearch from "../../components/Welcome/FormSearch";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>("");

  const moviesLatest = useAppSelector(
    (state) => state.movies.dataLatestUploads
  );
  const movieDataLatestUploads: any = moviesLatest.map((movies) => ({
    id: movies.id,
    title: movies.title,
    subtitle: movies.yearReleased,
    url: movies.movieLink.banner,
  }));

  React.useEffect(() => {
    dispatch(moviesLatestUploads());
  }, [dispatch]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let value = (event.target as HTMLInputElement).value;
    setSearch(value);
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    if (search === "") {
      navigate("../movies-all");
    } else {
      navigate("../search", { state: { search: search } });
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ width: 1, display: "inline", padding: 5 }}>
          <Box sx={{ width: 600 }}>
            <FormSearch
              error={""}
              search={search}
              onChange={onChangeHandler}
              onClick={onClickSubmitHandler}
            />
          </Box>
          <Box sx={{ width: 1, paddingTop: 5 }}>
            <FormImageList
              header="LATEST UPLOADS"
              page="movies-details"
              movieData={movieDataLatestUploads}
            />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Welcome;
