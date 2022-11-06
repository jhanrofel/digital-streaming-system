import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utilities/hooks";
import { isLogged } from "../../utilities/loggedIn";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormButton from "../FormButton";
import FormImageList from "../FormImageList";
import FormRating from "../FormRating";
import FormText from "../FormText";
import SnackAlert from "../SnackAlert";

type AppProps = {
  movie: any;
  categories: any;
  reviews: any;
  review: string;
  error: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  alertData: AlertData;
  setAlertData: (value: AlertData) => void;
  rate: number | null;
  setRate: (value: number | null) => void;
};

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const MovieDetailsForm = ({
  movie,
  categories,
  reviews,
  review,
  error,
  onChange,
  onClick,
  alertData,
  setAlertData,
  rate,
  setRate,
}: AppProps) => {
  const navigate = useNavigate();
  const actorData = movie.movieActors?.map((actor: any) => ({
    id: actor.id,
    title: actor.firstName,
    subtitle: "",
    url: actor.actorLink.catalogue,
  }));

  return (
    <>
      <Box sx={{ display: "flex", maxWidth: "100%" }}>
        <Box>
          <img
            src={`${movie.movieLink?.catalogue}`}
            alt={movie.title}
            height={"400"}
            loading="lazy"
          />
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {movie.yearReleased}
          </Typography>
        </Box>
        <Box sx={{ display: "inline", width: 1, padding: 3 }}>
          <Stack direction="row" spacing={3}>
            {movie.categories?.map((categoryMovie: string) => (
              <Chip
                key={categoryMovie}
                color="primary"
                label={
                  categories.find(
                    (category: any) => category.id === categoryMovie
                  )?.name
                }
              />
            ))}
          </Stack>
          <Grid container spacing={2}>
            {reviews.length > 0 ? (
              <Typography variant="h6" gutterBottom>
                No Review for this movie.
              </Typography>
            ) : (
              <Grid item xs={12} marginTop={2}>
                No Review for this movie.
              </Grid>
            )}
            {isLogged() ? (
              <Box>
                <Box sx={{ width: 800 }}>
                  <FormText
                    name="review"
                    value={review}
                    label="What can you say about this movie?."
                    type="search"
                    error={error}
                    onChange={onChange}
                  />
                </Box>
                <Box sx={{ width: 200 }}>
                  <FormRating rate={rate} setRate={setRate} />
                </Box>
                <Box sx={{ width: 200 }}>
                  <FormButton label="Send Review" onClick={onClick} />
                </Box>
              </Box>
            ) : (
              <Grid item xs={4}>
                <FormButton
                  label={"Login to Rate"}
                  onClick={() => navigate("../login")}
                />
              </Grid>
            )}
          </Grid>
        </Box>
        {/* <Box>
          <FormImageList header="ACTORS" movieData={actorData} />
        </Box> */}
      </Box>
      {/* <SnackAlert alertData={alertData} setAlertData={setAlertData} /> */}
    </>
  );
};

export default MovieDetailsForm;
