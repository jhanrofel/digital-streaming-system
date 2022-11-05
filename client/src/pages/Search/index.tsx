import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import {
  moviesLatestUploads,
  moviesSearch,
} from "../../utilities/slice/movieSlice";
import FormImageList from "../../components/FormImageList";

const Search = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const search = state.search;
  const movies = useAppSelector((state) => state.movies.data);
  const movieData: any = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    subtitle: movie.yearReleased,
    url: movie.movieLink.banner,
  }));
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
    dispatch(moviesSearch(search));
    dispatch(moviesLatestUploads());
  }, [dispatch, search]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {movieData.length > 0 ? (
          <>
            <FormImageList header="SEARCH RESULTS" movieData={movieData} />
            <FormImageList
              header="LATEST UPLOADS"
              movieData={movieDataLatestUploads}
            />
          </>
        ) : (
          <FormImageList
            header="0 SEARCH RESULTS, CHECK THESE MOVIES"
            movieData={movieDataLatestUploads}
          />
        )}
      </Box>
    </>
  );
};

export default Search;
