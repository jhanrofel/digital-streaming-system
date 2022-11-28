import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { reviewsApproved } from "../../utilities/slice/reviewSlice";
import { IReviewFormTable } from "../../utilities/types";
import ReviewForm from "../../components/Review/ReviewForm";

const ApprovedList = () => {
  const dispatch = useAppDispatch();
  const rows: IReviewFormTable[] = useAppSelector(
    (state) => state.reviews.list
  );

  useEffect(() => {
    dispatch(reviewsApproved());
  }, [dispatch]);

  return <ReviewForm rows={rows} formName={"approveReview"} />;
};

export default ApprovedList;
