import React from "react";
import { useLocation } from "react-router-dom";
import { alertDataReset } from "../../utilities/formValues";
import {
  useAppDispatch,
  useAppSelector,
  useFormValidation,
} from "../../utilities/hooks";
import {
  moviesById,
  moviesReviewsApproved,
  moviesRating,
} from "../../utilities/slice/movieSlice";
import { reviewsPost, myMovieReview } from "../../utilities/slice/reviewSlice";
import { IReviewFormPost, IAlert } from "../../utilities/types";
import MovieDetailsForm from "../../components/Movie/MovieDetailsForm";
import SnackAlert from "../../components/SnackAlert";
import UserLogin from "../Users/UserLogin";
import UserRegister from "../Users/UserRegister";

const MovieDetails = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const movieId = state;
  const movie = useAppSelector((stateMovie) => stateMovie.movies.byId);
  const currentUser = useAppSelector((state) => state.users.logged);

  const movieRating = useAppSelector(
    (stateMovieRating) => stateMovieRating.movies.rating
  );
  const reviews = useAppSelector((stateReviews) => stateReviews.movies.reviews);
  const myReview = useAppSelector(
    (stateMyReview) => stateMyReview.reviews.byId
  );

  React.useEffect(() => {
    dispatch(moviesById(movieId));
    dispatch(moviesReviewsApproved(movieId));
    dispatch(moviesRating(movieId));
    if (currentUser) {
      dispatch(myMovieReview(movieId));
    }
  }, [dispatch, movieId, currentUser]);

  const onClickSubmitHandler = async (): Promise<void> => {
    const postReviewValue: IReviewFormPost = {
      description: formValues.review,
      rating: formValues.rating,
      movie: movieId,
    };

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

  const [openUserLoginForm, setOpenUserLoginForm] = React.useState(false);
  const [openUserRegisterForm, setOpenUserRegisterForm] = React.useState(false);

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
        setOpenUserLoginForm={setOpenUserLoginForm}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
      <UserLogin
        openUserForm={openUserLoginForm}
        setOpenUserForm={setOpenUserLoginForm}
        setOpenUserRegisterForm={setOpenUserRegisterForm}
      />
      <UserRegister
        openUserForm={openUserRegisterForm}
        setOpenUserForm={setOpenUserRegisterForm}
      />
    </React.Fragment>
  );
};

export default MovieDetails;
