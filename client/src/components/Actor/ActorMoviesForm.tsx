import React from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormCard from "../../components/FormCard";
import FormButton from "../../components/FormButton";
import { useNavigate } from "react-router-dom";

type AppProps = {
  actor: FormValue;
  movies: MoviesClass[];
};

interface FormValue {
  firstName: string;
  lastName: string;
}

interface MoviesClass {
  title: string;
  link: string;
  movieLink: LinkClass;
}

interface LinkClass {
  banner: string;
  catalogue: string;
}

const ActorMovies = ({ actor, movies }: AppProps) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Divider
        sx={{ display: "flex", width: 600, paddingTop: 10 }}
        textAlign="left"
      >
        {`${actor.firstName} ${actor.lastName}'s MOVIES `}
      </Divider>
      <Box sx={{ display: "flex" }}>
        {movies?.map((movie,i) => (
          <FormCard key={i} title={movie.title} link={movie.movieLink.banner}/>
        ))}
      </Box>
      <Box sx={{ width: 300 }}>
        <FormButton
          label="Back to Actors List"
          onClick={() => {
            navigate("../actors");
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default ActorMovies;
