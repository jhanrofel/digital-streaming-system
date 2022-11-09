import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { reviewsApprovalList } from "../../utilities/slice/reviewSlice";
import { IReviewFormTable } from "../../utilities/types";
import ReviewForm from "../../components/Review/ReviewForm";

const ApprovalList = () => {
  const dispatch = useAppDispatch();
  const rows: IReviewFormTable[] = useAppSelector(
    (state) => state.reviews.data
  );

  useEffect(() => {
    dispatch(reviewsApprovalList());
  }, [dispatch]);

  return <ReviewForm rows={rows} formName={"pendingReview"} />;
};

export default ApprovalList;
