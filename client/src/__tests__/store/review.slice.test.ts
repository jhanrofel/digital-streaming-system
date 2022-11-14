import reducer, {
  reviewsList,
  reviewsApprovalList,
  reviewsApprovedList,
  reviewsDisapprovedList,
  reviewsPost,
  reviewsApproval,
  myMovieReview,clearReviews,selectReviews
} from "../../utilities/slice/reviewSlice";
import {
  mockReviewsList,
  mockReviewsPending,
  mockReviewsApproved,
  mockReviewsDispproved,
  mockReviewsPendingAfterPost,
  mockNewReviewPost,
  mockReviewApprovedId,
  mockReviewsPendingAfterApproved,
} from "../../mocks/review.mocks";
import { IReviewInitialState } from "../../utilities/types";

const reviewEmpty = {
  id: "",
  description: "",
  rating: 0,
  createdAt: "",
  approval: "pending",
  reviewMovie: { title: "" },
  reviewUser: { email: "" },
};

describe("Reviews Slice ExtraReducers", () => {
  const initialState: IReviewInitialState = {
    data: [],
    dataOne: reviewEmpty,
  };

  describe("review list", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: reviewsList.fulfilled.type,
          payload: mockReviewsList,
        })
      ).toEqual({
        data: mockReviewsList,
        dataOne: reviewEmpty,
      });
    });
  });

  describe("review approval list", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: reviewsApprovalList.fulfilled.type,
          payload: mockReviewsPending,
        })
      ).toEqual({
        data: mockReviewsPending,
        dataOne: reviewEmpty,
      });
    });
  });

  describe("review approved list", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: reviewsApprovedList.fulfilled.type,
          payload: mockReviewsApproved,
        })
      ).toEqual({
        data: mockReviewsApproved,
        dataOne: reviewEmpty,
      });
    });
  });

  describe("review disapproved list", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: reviewsDisapprovedList.fulfilled.type,
          payload: mockReviewsDispproved,
        })
      ).toEqual({
        data: mockReviewsDispproved,
        dataOne: reviewEmpty,
      });
    });
  });

  describe("create a review", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: reviewsPost.fulfilled.type,
          payload: mockNewReviewPost,
        })
      ).toEqual({
        data: [],
        dataOne: mockNewReviewPost,
      });
    });
  });

  describe("approval of reviews", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, data: mockReviewsPending },
          {
            type: reviewsApproval.fulfilled.type,
            payload: mockReviewApprovedId,
          }
        )
      ).toEqual({
        data: mockReviewsPendingAfterApproved,
        dataOne: reviewEmpty,
      });
    });
  });

  describe("current user review", () => {
    it("fulfilled", () => {
      expect(
        reducer(
            initialState,
          {
            type: myMovieReview.fulfilled.type,
            payload: mockNewReviewPost,
          }
        )
      ).toEqual({
        data: [],
        dataOne: mockNewReviewPost,
      });
    });
  });

  describe("clear reviews state", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, data: mockReviewsList },
          {
            type: clearReviews,
          }
        )
      ).toEqual({
        data: [],
        dataOne: reviewEmpty,
      });
    });
  });

  describe("select reviews", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: selectReviews,
          payload: mockNewReviewPost,
        })
      ).toEqual({
        logged: false,
        data: [],
        dataOne: mockNewReviewPost,
      });
    });
  });

});
