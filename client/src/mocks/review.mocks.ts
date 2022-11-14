import { IReviewFormTable } from "../utilities/types";

export const mockReviewsList: IReviewFormTable[] = [
  {
    id: "636b1ec790fe4644667becr1",
    description: "Nice movie",
    rating: 5,
    createdAt: "today",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "john.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becr2",
    description: "Wow",
    rating: 5,
    createdAt: "today",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "jane.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becr3",
    description: "Great watch",
    rating: 5,
    createdAt: "today",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "mary.grace@mail.com" },
  },
];

export const mockReviewsPending: IReviewFormTable[] = [
  {
    id: "636b1ec790fe4644667becp1",
    description: "Nice movie",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "john.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becp2",
    description: "Wow",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "jane.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becp3",
    description: "Great watch",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "mary.grace@mail.com" },
  },
];

export const mockReviewsApproved: IReviewFormTable[] = [
  {
    id: "636b1ec790fe4644667becap1",
    description: "Nice movie",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "john.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becap2",
    description: "Wow",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "jane.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becap3",
    description: "Great watch",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "mary.grace@mail.com" },
  },
];

export const mockReviewsDispproved: IReviewFormTable[] = [
  {
    id: "636b1ec790fe4644667becdp1",
    description: "Nice movie",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "john.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becdp2",
    description: "Wow",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "jane.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becdp3",
    description: "Great watch",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "mary.grace@mail.com" },
  },
];

export const mockNewReviewPost = {
  id: "636b1ec790fe4644667becp4",
  description: "New review post",
  rating: 5,
  createdAt: "today",
  approval: "pending",
  reviewMovie: { title: "Good movie" },
  reviewUser: { email: "mike.doe@mail.com" },
};

export const mockReviewsPendingAfterPost: IReviewFormTable[] = [
  {
    id: "636b1ec790fe4644667becp1",
    description: "Nice movie",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "john.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becp2",
    description: "Wow",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "jane.doe@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becp3",
    description: "Great watch",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "mary.grace@mail.com" },
  },
  {
    id: "636b1ec790fe4644667becp4",
    description: "New review post",
    rating: 5,
    createdAt: "today",
    approval: "pending",
    reviewMovie: { title: "New Blockbuster Movie" },
    reviewUser: { email: "mike.doe@mail.com" },
  },
];

export const mockReviewApprovedId = "636b1ec790fe4644667becp1";

export const mockReviewsPendingAfterApproved: IReviewFormTable[] = [
    {
      id: "636b1ec790fe4644667becp2",
      description: "Wow",
      rating: 5,
      createdAt: "today",
      approval: "pending",
      reviewMovie: { title: "New Blockbuster Movie" },
      reviewUser: { email: "jane.doe@mail.com" },
    },
    {
      id: "636b1ec790fe4644667becp3",
      description: "Great watch",
      rating: 5,
      createdAt: "today",
      approval: "pending",
      reviewMovie: { title: "New Blockbuster Movie" },
      reviewUser: { email: "mary.grace@mail.com" },
    },
  ];