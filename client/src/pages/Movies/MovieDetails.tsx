import React from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { categoriesList } from "../../utilities/slice/categorySlice";
import {
  moviesOne,
  moviesReviewsApproved,
} from "../../utilities/slice/movieSlice";
import { reviewsPost,myMovieReview } from "../../utilities/slice/reviewSlice";
import MovieDetailsForm from "../../components/Movie/MovieDetailsForm";

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

interface PostReviewPost {
  description: string;
  rating: number | null;
  movie: string;
}

const MovieDetails = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const movieId = state;
  const movie = useAppSelector((state) => state.movies.dataGetOne);
  const categories = useAppSelector((state) => state.categories.data);
  const reviews = useAppSelector((state) => state.movies.dataReviews);
  const myReview = useAppSelector((state) => state.reviews.dataOne);
  const [formValues, setFormValues] = React.useState<FormValues>({
    review: "",
    rating: null,
    alert: {
      open: false,
      message: "",
      severity: "info",
    },
  });
  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    review: "",
    rating: "",
  });

  React.useEffect(() => {
    dispatch(moviesOne(movieId));
    dispatch(categoriesList());
    dispatch(moviesReviewsApproved(movieId));
    dispatch(myMovieReview(movieId));
  }, [dispatch, movieId]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;
    if (name === "review") {
      setFormValues((state) => ({ ...state, review: value }));
      setFormErrors((state) => ({ ...state, review: "" }));
    }
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    const postReviewValue: PostReviewPost = {
      description: formValues.review,
      rating: formValues.rating,
      movie: movieId,
    };
    if (formValidation()) {
      await dispatch(reviewsPost(postReviewValue)).then((res) => {
        if (res.type === "reviews/post/fulfilled") {
          setFormValues((state) => ({
            ...state,
            alert: {
              open: true,
              message: "Review awaits for approval.",
              severity: "success",
            },
          }));
          setFormValues((state) => ({ ...state, review: "", rating: null }));
        } else {
          setFormValues((state) => ({
            ...state,
            alert: {
              open: true,
              message: res.payload,
              severity: "warning",
            },
          }));
        }
      });
    }
  };

  const formValidation = (): boolean => {
    let valid = false;
    if (formValues.review === "")
      setFormErrors((state) => ({ ...state, review: "Review is required." }));
    if (formValues.rating === null)
      setFormErrors((state) => ({ ...state, rating: "Rating is required." }));
    if (formValues.review !== "" && formValues.rating !== null) {
      valid = true;
    }

    return valid;
  };

  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setFormValues((state) => ({
      ...state,
      alert: { open: false, message: "", severity: "info" },
    }));
  };

  const onChangeRatingHandler = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ): void => {
    setFormValues((state) => ({ ...state, rating: newValue }));
  };

  return (
    <MovieDetailsForm
      formValues={formValues}
      formErrors={formErrors}
      movie={movie}
      categories={categories}
      reviews={reviews}
      myReview={myReview}
      onChange={onChangeHandler}
      onChangeRating={onChangeRatingHandler}
      onClick={onClickSubmitHandler}
      onClickCloseAlert={onClickCloseAlertHandler}
    />
  );
};

export default MovieDetails;
