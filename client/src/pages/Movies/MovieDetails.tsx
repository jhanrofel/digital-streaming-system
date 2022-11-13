import React from "react";
import { useLocation } from "react-router-dom";
import {
  movieFormResetErrors,
  movieFormReset,
  movieDetailsFormErrors,
  movieDetailsForm,
} from "../../utilities/formValues";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
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
  IReviewFormPost,IMovieReviewForm,IMovieReviewFormErrors,
} from "../../utilities/types";
import MovieDetailsForm from "../../components/Movie/MovieDetailsForm";

const MovieDetails = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const movieId = state;
  const movie = useAppSelector((stateMovie) => stateMovie.movies.byId);
  const movieRating = useAppSelector(
    (stateMovieRating) => stateMovieRating.movies.rating
  );
  const categories = useAppSelector(
    (stateCategories) => stateCategories.categories.data
  );
  const reviews = useAppSelector((stateReviews) => stateReviews.movies.reviews);
  const myReview = useAppSelector(
    (stateMyReview) => stateMyReview.reviews.dataOne
  );
  const [formValues, setFormValues] = React.useState<IMovieReviewForm>(
    movieDetailsForm
  );
  const [formErrors, setFormErrors] = React.useState<IMovieReviewFormErrors>(
    movieDetailsFormErrors
  );

  React.useEffect(() => {
    dispatch(moviesById(movieId));
    dispatch(categoriesList());
    dispatch(moviesReviewsApproved(movieId));
    dispatch(moviesRating(movieId));
    if (isLogged()) {
      dispatch(myMovieReview(movieId));
    }
  }, [dispatch, movieId]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;
    if (name === "review") {
      // setFormValues((stateReviewForm) => ({
      //   ...stateReviewForm,
      //   review: value,
      // }));
      // setFormErrors((stateReviewError) => ({
      //   ...stateReviewError,
      //   review: "",
      // }));
    }
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    // const postReviewValue: IReviewFormPost = {
    //   description: formValues.review,
    //   rating: formValues.rating,
    //   movie: movieId,
    // };
    // if (formValidation()) {
    //   await dispatch(reviewsPost(postReviewValue)).then((res) => {
    //     if (res.type === "reviews/post/fulfilled") {
    //       setFormValues((stateAlertFullfilled) => ({
    //         ...stateAlertFullfilled,
    //         alert: {
    //           open: true,
    //           message: "Review awaits for approval.",
    //           severity: "success",
    //         },
    //       }));
    //       setFormValues((stateRatingValue) => ({
    //         ...stateRatingValue,
    //         review: "",
    //         rating: null,
    //       }));
    //     } else {
    //       setFormValues((stateAlertReject) => ({
    //         ...stateAlertReject,
    //         alert: {
    //           open: true,
    //           message: res.payload,
    //           severity: "warning",
    //         },
    //       }));
    //     }
    //   });
    // }
  };

  const formValidation = (): boolean => {
    let valid = false;
    // if (formValues.review === "")
    //   setFormErrors((stateReviewError) => ({
    //     ...stateReviewError,
    //     review: "Review is required.",
    //   }));
    // if (formValues.rating === null)
    //   setFormErrors((stateRatingError) => ({
    //     ...stateRatingError,
    //     rating: "Rating is required.",
    //   }));
    // if (formValues.review !== "" && formValues.rating !== null) {
    //   valid = true;
    // }

    return valid;
  };

  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    // setFormValues((stateAlertForm) => ({
    //   ...stateAlertForm,
    //   alert: { open: false, message: "", severity: "info" },
    // }));
  };

  const onChangeRatingHandler = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ): void => {
    // setFormValues((stateRatingForm) => ({
    //   ...stateRatingForm,
    //   rating: newValue,
    // }));
  };

  return (
    <MovieDetailsForm
      formValues={formValues}
      formErrors={formErrors}
      movie={movie}
      categories={categories}
      reviews={reviews}
      myReview={myReview}
      movieRating={movieRating}
      onChange={onChangeHandler}
      onChangeRating={onChangeRatingHandler}
      onClick={onClickSubmitHandler}
      onClickCloseAlert={onClickCloseAlertHandler}
    />
  );
};

export default MovieDetails;
