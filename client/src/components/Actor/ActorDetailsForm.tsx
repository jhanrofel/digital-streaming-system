import React from "react";
import { useNavigate } from "react-router-dom";
import { isLogged } from "../../utilities/loggedIn";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StarsIcon from "@mui/icons-material/Stars";
import FormButton from "../FormButton";
import FormImageList from "../FormImageList";
import FormRating from "../FormRating";
import FormText from "../FormText";
import SnackAlert from "../SnackAlert";

type AppProps = {
  actor: any;
  actorMovies: any;
};

const getAge = (birthday: string): number => {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ActorDetailsForm = ({ actor, actorMovies }: AppProps) => {
  const navigate = useNavigate();
  const movieData = actorMovies?.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    subtitle: movie.yearReleased,
    url: movie.movieLink.catalogue,
  }));
  const age: number = getAge(actor.birthday);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", maxWidth: "100%" }}>
        <Box sx={{width: 400 }}>
          <Box>
            <img
              src={`${actor.actorLink?.catalogue}`}
              alt={actor.title}
              height={"400"}
              width="100%"
            />
          </Box>
          <Typography variant="h4" gutterBottom>
            {`${actor.firstName} ${actor.lastName} `}
          </Typography>
          <Typography>
            {`Birthday : ${actor.birthday?.substring(0, 10)}`}
          </Typography>
          <Typography>
            {`Gender : ${actor.gender}`}
          </Typography>

          <Typography>{`Age : ${age}`}</Typography>
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
