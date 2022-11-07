import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utilities/hooks";
import { isLogged } from "../../utilities/loggedIn";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
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
  formValues: FormValues;
  formErrors: FormErrors;
  movie: any;
  categories: any;
  reviews: any;
  myReview: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeRating: (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => void;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

interface FormValues {
  review: string;
  rating: number | null;
  alert: AlertData;
}

interface FormErrors {
  review: string;
  rating: string;
}

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const MovieDetailsForm = ({
  formValues,
  formErrors,
  movie,
  categories,
  reviews,
  myReview,
  onChange,
  onChangeRating,
  onClick,
  onClickCloseAlert,
}: AppProps) => {
  const navigate = useNavigate();
  const actorData = movie.movieActors?.map((actor: any) => ({
    id: actor.id,
    title: `${actor.firstName} ${actor.lastName}`,
    subtitle: "",
    url: actor.actorLink.catalogue,
  }));

  return (
    <React.Fragment>
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
          <Box sx={{ width: 600 }}>
            <FormImageList
              header="ACTORS"
              movieData={actorData ? actorData : []}
            />
          </Box>
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
            {isLogged() ? (
              <Box sx={{ display: "inline", width: 1, paddingTop: 3 }}>
                {myReview ? (
                  <Box sx={{ width: 600 }}>
                    <Typography variant="h5" padding={1}>
                      {myReview.description}
                    </Typography>
                    <FormRating
                        name={"rated"}
                        value={myReview?.rating || null}
                        error={""}
                      />
                  </Box>
                ) : (
                  <>
                    <Box sx={{ width: 600 }}>
                      <FormText
                        name="review"
                        value={formValues.review}
                        label={"What can you say about this movie?."}
                        type={"search"}
                        error={formErrors.review}
                        onChange={onChange}
                      />
                    </Box>
                    <Box sx={{ width: 200 }}>
                      <FormRating
                        name={"rating"}
                        value={formValues.rating}
                        error={formErrors.rating}
                        onChange={onChangeRating}
                      />
                    </Box>
                    <Box sx={{ width: 200 }}>
                      <FormButton label="Send Review" onClick={onClick} />
                    </Box>
                  </>
                )}
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
        <Box sx={{ display: "inline", width: 1, padding: 3 }}>
          {reviews.length > 0 ? (
            <List
              sx={{ width: "100%", maxWidth: 360 }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  MOVIE REVIEWS
                </ListSubheader>
              }
            >
              {reviews.map((review: any) => (
                <ListItemButton key={review.id}>
                  <IconButton>
                    {review.rating} <StarsIcon color="primary" />
                  </IconButton>
                  <ListItemText primary={review.description} />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography variant="h6" gutterBottom>
              No Review for this movie.
            </Typography>
          )}
        </Box>
      </Box>
      <SnackAlert
        alertData={formValues.alert}
        onClickCloseAlert={onClickCloseAlert}
      />
    </React.Fragment>
  );
};

export default MovieDetailsForm;
