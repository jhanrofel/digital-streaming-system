import React from "react";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
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
  movieLink: LinkClass;
}

interface LinkClass {
  banner: string;
  catalogue: string;
}


const ActorMovies = ({ actor, movies}: AppProps) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
    <Container sx={{ marginTop: 10 }}>
      <Divider
        sx={{ display: "flex", width: 600, paddingTop: 5 }}
        textAlign="left"
      >
        {`${actor.firstName} ${actor.lastName}'s MOVIES `}
      </Divider>
      <Grid>
        <List>
          <ListItem>
            {movies?.map((movie) => 
              (<FormCard title={movie.title} link={movie.movieLink.banner} />)
            )}
          </ListItem>
        </List>
      </Grid>
      
    
    </Container>
    <Container sx={{ width: 300 }}>
      <FormButton label="Back to Actors List" onClick={() => {navigate("../actors")}} />
    </Container>
    </React.Fragment>
  );
};

export default ActorMovies;
