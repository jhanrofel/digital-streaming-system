import React from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { reviewsDisapproved } from "../../utilities/slice/reviewSlice";
import { IReviewFormTable } from "../../utilities/types";
import ReviewForm from "../../components/Review/ReviewForm";

const DisapprovedList = () => {
  const dispatch = useAppDispatch();
  const rows: IReviewFormTable[] = useAppSelector(
    (state) => state.reviews.list
  );

  React.useEffect(() => {
    dispatch(reviewsDisapproved());
  }, [dispatch]);

  return <ReviewForm rows={rows} formName={"disapproveReview"} />;
};

export default DisapprovedList;
