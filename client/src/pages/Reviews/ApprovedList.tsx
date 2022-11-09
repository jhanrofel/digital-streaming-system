import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { reviewsApprovedList } from "../../utilities/slice/reviewSlice";
import { IReviewFormTable } from "../../utilities/types";
import ReviewForm from "../../components/Review/ReviewForm";

const ApprovedList = () => {
  const dispatch = useAppDispatch();
  const rows: IReviewFormTable[] = useAppSelector(
    (state) => state.reviews.data
  );

  useEffect(() => {
    dispatch(reviewsApprovedList());
  }, [dispatch]);

  return <ReviewForm rows={rows} formName={"approveReview"} />;
};

export default ApprovedList;
