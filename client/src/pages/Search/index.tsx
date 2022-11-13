import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { ICard } from "../../utilities/types";
import {
  moviesLatestUploads,
  moviesSearch,
} from "../../utilities/slice/movieSlice";
import FormImageList from "../../components/FormImageList";

const Search = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const search = state.search;
  const movies = useAppSelector((stateMovies) => stateMovies.movies.list);
  const movieCard: ICard[] = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    subtitle: movie.yearReleased,
    url: movie.imageLink,
  }));
  const moviesLatest = useAppSelector(
    (stateMovieLatest) => stateMovieLatest.movies.list
  );
  const movieLatestUploads: any = moviesLatest.map((movieDataLatest) => ({
    id: movieDataLatest.id,
    title: movieDataLatest.title,
    subtitle: movieDataLatest.yearReleased,
    url: movieDataLatest.imageLink,
  }));

  React.useEffect(() => {
    dispatch(moviesSearch(search));
    dispatch(moviesLatestUploads());
  }, [dispatch, search]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {movieCard.length > 0 ? (
          <>
            <FormImageList
              page="movies-details"
              header="SEARCH RESULTS"
              movieData={movieCard}
            />
            <FormImageList
              header="LATEST UPLOADS"
              page="movies-details"
              movieData={movieLatestUploads}
            />
          </>
        ) : (
          <FormImageList
            header="0 SEARCH RESULTS, CHECK THESE MOVIES"
            page="movies-details"
            movieData={movieLatestUploads}
          />
        )}
      </Box>
    </>
  );
};

export default Search;
