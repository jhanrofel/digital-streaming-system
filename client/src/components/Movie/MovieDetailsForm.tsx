import React from "react";
import { useNavigate } from "react-router-dom";
import { isLogged } from "../../utilities/loggedIn";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReviewCards from "./ReviewCards";
import FormButton from "../FormButton";
import FormImageList from "../FormImageList";
import FormRating from "../FormRating";
import FormText from "../FormText";
import FormYoutube from "../FormYoutube";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formValues: FormValues;
  formErrors: FormErrors;
  movie: any;
  categories: any;
  reviews: any;
  myReview: any;
  movieRating: any;
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
  movieRating,
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
          <Box sx={{ display: "flex", maxWidth: "100%" }}>
            <FormRating
              name={"movieRating"}
              value={movieRating.length ? movieRating[0].average : null}
              error={""}
            />
            <Typography sx={{ fontSize: 16, paddingLeft: 1 }}>
              {movieRating.length ? `${movieRating[0].average}/5` : "0/5"}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 16, paddingLeft: 1 }}>
            {movieRating.length ? `${movieRating[0].count} reviews` : ""}
          </Typography>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography>{movie.yearReleased}</Typography>
          <Typography>
            Budget: ${movie.cost?.toLocaleString("en-US")}
          </Typography>
        </Box>
        <Box sx={{ display: "inline", width: 1, padding: 3 }}>
          {movie.movieLink && movie.movieLink.trailer && <Box sx={{ width: 600 }}><FormYoutube url={movie.movieLink.trailer}/></Box>}

          <Box sx={{ width: 600 }}>
            <FormImageList
              header="ACTORS"
              page="actors-details"
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
                {myReview &&
                  (myReview.approval === "pending" ||
                    myReview.approval === "disapproved") && (
                    <Card sx={{ minWidth: 275, margin: 2 }}>
                      <CardContent>
                        <Typography sx={{ fontSize: 18 }}>
                          {myReview.description}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          {myReview.createdAt}
                        </Typography>
                        <FormRating
                          name={"rating"}
                          value={myReview.rating ? myReview.rating : null}
                          error={""}
                        />
                        <Typography sx={{ fontSize: 14 }}>
                          {myReview.approval === "pending"
                            ? "For Approval"
                            : "Disapproved"}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                {!myReview && (
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
            <React.Fragment>
              <Divider textAlign="left">
                <Chip label={"MOVIE REVIEWS"} color="primary" />
              </Divider>
              <ReviewCards reviews={reviews} />
            </React.Fragment>
          ) : (
            <Typography variant="h6" gutterBottom>
              No Review for this movie.
            </Typography>
          )}
          {}
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
