import React from "react";
import { useLocation } from "react-router-dom";
import {
  movieFormResetErrors,
  movieFormReset,
  movieDetailsFormErrors,
  movieDetailsForm,
  alertDataReset,
} from "../../utilities/formValues";
import {
  useAppDispatch,
  useAppSelector,
  useFormValidation,
} from "../../utilities/hooks";
import { isLogged } from "../../utilities/loggedIn";
import { categoriesList } from "../../utilities/slice/categorySlice";
import {
  moviesById,
  moviesReviewsApproved,
  moviesRating,
} from "../../utilities/slice/movieSlice";
import { reviewsPost, myMovieReview } from "../../utilities/slice/reviewSlice";
import {
  IMovieForm,
  IMovieFormErrors,
  IReviewFormPost,
  IMovieReviewForm,
  IMovieReviewFormErrors,
  IAlert,
} from "../../utilities/types";
import MovieDetailsForm from "../../components/Movie/MovieDetailsForm";
import SnackAlert from "../../components/SnackAlert";

const MovieDetails = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const movieId = state;
  const movie = useAppSelector((stateMovie) => stateMovie.movies.byId);

  const movieRating = useAppSelector(
    (stateMovieRating) => stateMovieRating.movies.rating
  );
  const reviews = useAppSelector((stateReviews) => stateReviews.movies.reviews);
  const myReview = useAppSelector(
    (stateMyReview) => stateMyReview.reviews.dataOne
  );

  React.useEffect(() => {
    dispatch(moviesById(movieId));
    dispatch(moviesReviewsApproved(movieId));
    dispatch(moviesRating(movieId));
    if (isLogged()) {
      dispatch(myMovieReview(movieId));
    }
  }, [dispatch, movieId]);

  const onClickSubmitHandler = async (): Promise<void> => {
    const postReviewValue: IReviewFormPost = {
      description: formValues.review,
      rating: formValues.rating,
      movie: movieId,
    };

    console.log(formValues);

    await dispatch(reviewsPost(postReviewValue)).then((res) => {
      if (res.type === "reviews/post/fulfilled") {
        resetForm();
        setAlert({
          open: true,
          message: `Review awaits for approval.`,
          severity: "success",
        });
      } else {
        setAlert({
          open: true,
          message: res.payload,
          severity: "warning",
        });
      }
    });
  };

  const {
    onChangeHandler,
    onClickHandler,
    onChangeRating,
    formValues,
    formErrors,
    resetForm,
  } = useFormValidation({
    callback: onClickSubmitHandler,
    fieldsToValidate: ["review", "rating"],
  });

  const [alertData, setAlert] = React.useState<IAlert>(alertDataReset);
  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setAlert(alertDataReset);
  };

  return (
    <React.Fragment>
      <MovieDetailsForm
        formValues={formValues}
        formErrors={formErrors}
        movie={movie}
        reviews={reviews}
        myReview={myReview}
        movieRating={movieRating}
        onChange={onChangeHandler}
        onChangeRating={onChangeRating}
        onClick={onClickHandler}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </React.Fragment>
  );
};

export default MovieDetails;
