import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormButton from "../../components/FormButton";
import FormCard from "../../components/FormCard";

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
  catalogue: string;
}

const ActorMoviesForm = ({ actor, movies }: AppProps) => {
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
        {movies?.map((movie, i) => (
          <FormCard key={i} title={movie.title} link={movie.movieLink.catalogue} />
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

export default ActorMoviesForm;
