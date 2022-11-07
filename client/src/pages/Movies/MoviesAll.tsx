import React from "react";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import {
  moviesLatestUploads,
  moviesFeatured,
  moviesComingSoon,
} from "../../utilities/slice/movieSlice";
import FormImageList from "../../components/FormImageList";

const MoviesAll = () => {
  const dispatch = useAppDispatch();
  const moviesLatest = useAppSelector(
    (state) => state.movies.dataLatestUploads
  );
  const movieDataLatestUploads: any = moviesLatest.map((movies) => ({
    id: movies.id,
    title: movies.title,
    subtitle: movies.yearReleased,
    url: movies.movieLink.banner,
  }));
  const moviesDataFeatured = useAppSelector(
    (state) => state.movies.dataFeatured
  );
  const movieDataFeatured: any = moviesDataFeatured.map((movies) => ({
    id: movies.id,
    title: movies.title,
    subtitle: movies.yearReleased,
    url: movies.movieLink.banner,
  }));
  const moviesDataComingSoon = useAppSelector(
    (state) => state.movies.dataComingSoon
  );
  const movieDataComingSoon: any = moviesDataComingSoon.map((movies) => ({
    id: movies.id,
    title: movies.title,
    subtitle: movies.yearReleased,
    url: movies.movieLink.banner,
  }));

  React.useEffect(() => {
    dispatch(moviesLatestUploads());
    dispatch(moviesFeatured());
    dispatch(moviesComingSoon());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        {movieDataLatestUploads.length && (
          <FormImageList
            header="LATEST UPLOADS"
            page="movies-details"
            movieData={movieDataLatestUploads}
          />
        )}
        {movieDataFeatured.length && (
          <FormImageList
            header="FEATURED MOVIES"
            page="movies-details"
            movieData={movieDataFeatured}
          />
        )}
        {movieDataComingSoon.length && (
          <FormImageList
            header="COMING SOON"
            page="movies-details"
            movieData={movieDataComingSoon}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

export default MoviesAll;
