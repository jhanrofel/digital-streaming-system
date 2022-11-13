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
    (state) => state.movies.list
  );
  const movieDataLatestUploads: any = moviesLatest.map((movies) => ({
    id: movies.id,
    title: movies.title,
    subtitle: movies.yearReleased,
    url: movies.imageLink,
  }));
  const moviesDataFeatured = useAppSelector(
    (state) => state.movies.featured
  );
  const movieDataFeatured: any = moviesDataFeatured.map((movieFeatured) => ({
    id: movieFeatured.id,
    title: movieFeatured.title,
    subtitle: movieFeatured.yearReleased,
    url: movieFeatured.imageLink,
  }));
  const moviesDataComingSoon = useAppSelector(
    (state) => state.movies.comingSoon
  );
  const movieDataComingSoon: any = moviesDataComingSoon.map((movieComingSoon) => ({
    id: movieComingSoon.id,
    title: movieComingSoon.title,
    subtitle: movieComingSoon.yearReleased,
    url: movieComingSoon.imageLink,
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
