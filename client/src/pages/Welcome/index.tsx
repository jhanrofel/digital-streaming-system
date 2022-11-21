import React from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { ICard } from "../../utilities/types";
import { moviesLatestUploads } from "../../utilities/slice/movieSlice";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormImageList from "../../components/FormImageList";
import FormSearch from "../../components/Welcome/FormSearch";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const moviesLatest = useAppSelector((state) => state.movies.list);
  const movieLatestUploads: ICard[] = moviesLatest.map((movies) => ({
    id: movies.id,
    title: movies.title,
    subtitle: movies.yearReleased,
    url: movies.imageLink,
  }));

  React.useEffect(() => {
    dispatch(moviesLatestUploads());
  }, [dispatch]);

  const onClickSubmitHandler = async (): Promise<void> => {
    navigate("../movies-all");
  };

  return (
    <React.Fragment>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ width: 1, display: "inline", padding: 5 }}>
          <Box sx={{ width: 600 }}>
            <FormSearch onClick={onClickSubmitHandler} />
          </Box>
          <Box sx={{ width: 1, paddingTop: 5 }}>
            <FormImageList
              header="LATEST UPLOADS"
              page="movies-details"
              movieData={movieLatestUploads}
            />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Welcome;
