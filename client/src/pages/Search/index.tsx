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
  const movies = useAppSelector((stateMovies) => stateMovies.movies.data);
  const movieData: any = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    subtitle: movie.yearReleased,
    url: movie.movieLink.catalogue,
  }));
  const moviesLatest = useAppSelector(
    (stateMovieLatest) => stateMovieLatest.movies.dataLatestUploads
  );
  const movieDataLatestUploads: any = moviesLatest.map((movieDataLatest) => ({
    id: movieDataLatest.id,
    title: movieDataLatest.title,
    subtitle: movieDataLatest.yearReleased,
    url: movieDataLatest.movieLink.catalogue,
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
            <FormImageList
              page="movies-details"
              header="SEARCH RESULTS"
              movieData={movieData}
            />
            <FormImageList
              header="LATEST UPLOADS"
              page="movies-details"
              movieData={movieDataLatestUploads}
            />
          </>
        ) : (
          <FormImageList
            header="0 SEARCH RESULTS, CHECK THESE MOVIES"
            page="movies-details"
            movieData={movieDataLatestUploads}
          />
        )}
      </Box>
    </>
  );
};

export default Search;
