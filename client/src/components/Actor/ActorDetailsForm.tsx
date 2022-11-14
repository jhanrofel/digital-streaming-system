import React from "react";
import { getAge } from "../../utilities/helpers";
import { IActorData, ICard, IMovieForm } from "../../utilities/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormImageList from "../FormImageList";

type AppProps = {
  actor: IActorData | null;
  actorMovies: IMovieForm[] | [];
};

const ActorDetailsForm = ({ actor, actorMovies }: AppProps) => {
  const movieData:ICard[] = actorMovies?.map((movie) => ({
    id: movie.id,
    title: movie.title,
    subtitle: movie.yearReleased,
    url: movie.imageLink,
  }));

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", maxWidth: "100%" }}>
        <Box sx={{ width: 400 }}>
          <Box>
            <img
              src={`${actor?.imageLink}`}
              alt={`${actor?.firstName} ${actor?.lastName}`}
              height={"400"}
              width="100%"
            />
          </Box>
          <Typography variant="h4" gutterBottom>
            {`${actor?.firstName} ${actor?.lastName} `}
          </Typography>
          <Typography>
            {`Birthday : ${actor?.birthday?.substring(0, 10)}`}
          </Typography>
          <Typography>{`Gender : ${actor?.gender}`}</Typography>

          <Typography>
            {`Age : ` + (actor ? getAge(actor?.birthday) : "")}
          </Typography>
        </Box>
        <Box sx={{ display: "inline", width: 1, padding: 3 }}>
          <Box sx={{ width: 600 }}>
            <FormImageList
              header="MOVIES IN"
              page="movies-details"
              movieData={movieData ? movieData : []}
            />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ActorDetailsForm;
