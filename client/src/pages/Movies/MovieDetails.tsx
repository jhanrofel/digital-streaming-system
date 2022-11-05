import React from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { actorsList } from "../../utilities/slice/actorSlice";
import { categoriesList } from "../../utilities/slice/categorySlice";
import { moviesOne } from "../../utilities/slice/movieSlice";
import { reviewsPost } from "../../utilities/slice/reviewSlice";
import MovieDetailsForm from "../../components/Movie/MovieDetailsForm";

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
  const [alertData, setAlertData] = React.useState<AlertData>({
    open: false,
    message: "",
    severity: "info",
  });
  const { state } = useLocation();
  const movieId = state;
  const movie = useAppSelector((state) => state.movies.dataGetOne);
  const categories = useAppSelector((state) => state.categories.data);
  const reviews = useAppSelector((state) => state.reviews.data);
  const [review, setReview] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [rate, setRate] = React.useState<number | null>(null);

  React.useEffect(() => {
    dispatch(moviesOne(movieId));
    dispatch(categoriesList());
  }, [movieId]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let value = (event.target as HTMLInputElement).value;
    setReview(value);
    setError("");
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    const postReviewValue: PostReviewPost = {
      description: review,
      rating: rate,
      movie: movieId,
    };
    if (formValidation()) {
      await dispatch(reviewsPost(postReviewValue)).then((res) => {
        if (res.type === "reviews/post/fulfilled") {
          setAlertData({
            open: true,
            message: "Review awaits for approval.",
            severity: "success",
          });

          setReview("");
          setRate(null);
        } else {
          setAlertData({
            open: true,
            message: res.payload,
            severity: "warning",
          });
        }
      });
    }
  };

  const formValidation = (): boolean => {
    let valid = false;
    if (review === "") setError("Review is required.");
    if (rate === null)
      setAlertData({
        open: true,
        message: "Rate is required",
        severity: "error",
      });
    if (review !== "" && rate !== null) {
      valid = true;
    }

    return valid;
  };

  return (
    <MovieDetailsForm
      movie={movie}
      categories={categories}
      reviews={reviews}
      review={review}
      error={error}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      alertData={alertData}
      setAlertData={setAlertData}
      rate={rate}
      setRate={setRate}
    />
  );
};

export default MovieDetails;
