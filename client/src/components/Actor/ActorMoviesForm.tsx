import React from "react";
import { useNavigate } from "react-router-dom";
import { IActorData, IMovieForm } from "../../utilities/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormButton from "../../components/FormButton";
import FormCard from "../../components/FormCard";

type AppProps = {
  actor: IActorData | null;
  movies: IMovieForm[];
};

const ActorMoviesForm = ({ actor, movies }: AppProps) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        sx={{ display: "flex", width: 600, paddingTop: 10, paddingBottom: 2 }}
      >{`${actor?.firstName} ${actor?.lastName}'s MOVIES `}</Typography>
      <Box sx={{ display: "flex" }}>
        {movies?.map((movie, i) => (
          <FormCard key={i} title={movie.title} link={movie.imageLink} />
        ))}
      </Box>
      <Box>
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
