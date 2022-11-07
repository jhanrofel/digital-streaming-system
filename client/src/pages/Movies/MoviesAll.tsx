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
    url: movies.movieLink.catalogue,
  }));
  const moviesDataFeatured = useAppSelector(
    (state) => state.movies.dataFeatured
  );
  const movieDataFeatured: any = moviesDataFeatured.map((moviesFeatured) => ({
    id: moviesFeatured.id,
    title: moviesFeatured.title,
    subtitle: moviesFeatured.yearReleased,
    url: moviesFeatured.movieLink.catalogue,
  }));
  const moviesDataComingSoon = useAppSelector(
    (state) => state.movies.dataComingSoon
  );
  const movieDataComingSoon: any = moviesDataComingSoon.map((moviesComingSoon) => ({
    id: moviesComingSoon.id,
    title: moviesComingSoon.title,
    subtitle: moviesComingSoon.yearReleased,
    url: moviesComingSoon.movieLink.catalogue,
  }));

  React.useEffect(() => {
    dispatch(moviesLatestUploads());
    dispatch(moviesFeatured());
    dispatch(moviesComingSoon());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        {movieDataLatestUploads.length > 0 && (
          <FormImageList
            header="LATEST UPLOADS"
            page="movies-details"
            movieData={movieDataLatestUploads}
          />
        )}
        {movieDataFeatured.length > 0 && (
          <FormImageList
            header="FEATURED MOVIES"
            page="movies-details"
            movieData={movieDataFeatured}
          />
        )}
        {movieDataComingSoon.length > 0 && (
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
