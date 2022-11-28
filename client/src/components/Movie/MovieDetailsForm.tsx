import React from "react";
import { isLogged } from "../../utilities/loggedIn";
import { IObjectAny } from "../../utilities/types";
import { userMe } from "../../utilities/api";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ReviewCards from "./ReviewCards";
import FormButton from "../FormButton";
import FormImageList from "../FormImageList";
import FormRating from "../FormRating";
import FormText from "../FormText";
import FormYoutube from "../FormYoutube";

type AppProps = {
  formValues: IObjectAny;
  formErrors: IObjectAny;
  movie: any;
  reviews: any;
  myReview: any;
  movieRating: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeRating: (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => void;
  onClick: any;
  setOpenUserLoginForm: any;
};

const MovieDetailsForm = ({
  formValues,
  formErrors,
  movie,
  reviews,
  myReview,
  movieRating,
  onChange,
  onChangeRating,
  onClick,
  setOpenUserLoginForm,
}: AppProps) => {
  const actorData = movie?.movieActors?.map((actor: any) => ({
    id: actor.id,
    title: `${actor.firstName} ${actor.lastName}`,
    subtitle: "",
    url: actor.imageLink,
  }));

  const [role, setRole] = React.useState<string>("USER");
  React.useEffect(() => {
    if (isLogged()) {
      const fetchData = async () => {
        await userMe().then((res) => {
          setRole(res.users[0].role);
        });
      };

      fetchData().catch(console.error);
    }
  }, []);

  return (
    movie &&
    movieRating && (
      <React.Fragment>
        <Box sx={{ display: "flex", maxWidth: "100%" }}>
          <Box>
            <img
              src={`${movie.imageLink}`}
              alt={movie?.title}
              height={"400"}
              loading="lazy"
            />
            <Box sx={{ display: "flex", maxWidth: "100%" }}>
              <FormRating
                name={"movieRating"}
                value={movieRating?.length ? movieRating[0].average : null}
                error={""}
              />
              <Typography sx={{ fontSize: 16, paddingLeft: 1 }}>
                {movieRating.length
                  ? `${parseFloat(movieRating[0].average.toFixed(2))}/5`
                  : "0/5"}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 16, paddingLeft: 1 }}>
              {movieRating.length ? `${movieRating[0].count} reviews` : ""}
            </Typography>
            <Typography variant="h4">{movie?.title}</Typography>
            <Typography>{movie.yearReleased}</Typography>
            <Typography>
              Budget: ${movie.cost.toLocaleString("en-US")}
            </Typography>
          </Box>
          <Box sx={{ display: "inline", width: 1, padding: 3 }}>
            {movie.trailerLink && (
              <Box sx={{ width: 600 }}>
                <FormYoutube url={movie.trailerLink} />
              </Box>
            )}

            <Box sx={{ width: 600 }}>
              <FormImageList
                header="ACTORS"
                page="actors-details"
                movieData={actorData ? actorData : []}
              />
            </Box>

            {isLogged() === 1 && myReview && myReview.approval !== "approved" && (
              <Box sx={{ display: "inline", width: 1, paddingTop: 3 }}>
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
                    {myReview.approval === "pending" && (
                      <Typography sx={{ fontSize: 14 }}>
                        For Approval
                      </Typography>
                    )}
                    {myReview.approval === "disapproved" && (
                      <Typography sx={{ fontSize: 14 }}>Disapproved</Typography>
                    )}
                  </CardContent>
                </Card>
              </Box>
            )}

            {isLogged() === 1 && !myReview && role !== "ADMIN" && (
              <React.Fragment>
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
                    value={formValues.rating || 0}
                    error={formErrors.rating}
                    onChange={onChangeRating}
                  />
                </Box>
                <Box sx={{ width: 200 }}>
                  <FormButton label="Send Review" onClick={onClick} />
                </Box>
              </React.Fragment>
            )}

            {isLogged() === 0 && (
              <Grid item xs={4}>
                <FormButton
                  label={"Login to Rate"}
                  onClick={() => setOpenUserLoginForm(true)}
                />
              </Grid>
            )}
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
          </Box>
        </Box>
      </React.Fragment>
    )
  );
};

export default MovieDetailsForm;
