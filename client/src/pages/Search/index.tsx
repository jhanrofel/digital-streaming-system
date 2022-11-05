import React from "react";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { moviesList } from "../../utilities/slice/movieSlice";
import FormImageList from "../../components/FormImageList";

interface ImageData {
  id: string;
  title: string;
  subtitle: string;
  url: string;
}



const Search = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.data);

//   if (movies.length > 0) {
    const movieData:any = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      subtitle: movie.yearReleased,
      url: movie.movieLink.banner,
    }));
//   }

console.log(movieData)

  React.useEffect(() => {
    dispatch(moviesList());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <FormImageList movieData={movieData}/>
      </Box>
    </>
  );
};

export default Search;
