import {
  IActorForm,
  IAlert,
  IUserLogin,
  IMovieForm,
  IMovieFormErrors,
  IMovieReviewForm,
  IMovieReviewFormErrors,
  IUserForm,
  IUserRegister,
} from "./types";

export const alertDataReset: IAlert = {
  open: false,
  message: "string",
  severity: "info",
};

export const actorFormReset: IActorForm = {
  firstName: "",
  lastName: "",
  gender: "",
  birthday: "",
  imageLink: "",
};

export const userLogin: IUserLogin = {
  email: "",
  password: "",
};

export const movieFormReset: IMovieForm = {
  title: "",
  cost: "",
  yearReleased: "",
  comingSoon: "False",
  featured: "False",
  imageLink: "",
  trailerLink: "",
  actors: [],
};

export const movieFormResetErrors: IMovieFormErrors = {
  title: "",
  cost: "",
  yearReleased: "",
  comingSoon: "",
  featured: "",
  imageLink: "",
  trailerLink: "",
  actors: "",
};

export const movieDetailsForm: IMovieReviewForm = {
  review: "",
  rating: 0,
};

export const movieDetailsFormErrors: IMovieReviewFormErrors = {
  review: "",
  rating: "",
};

export const userRegisterForm: IUserRegister = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

export const userForm: IUserForm = {
  role: "",
  email: "",
  firstName: "",
  lastName: "",
  approval: "",
  password: "",
};

export const roleOptions: string[] = ["USER", "ADMIN"];

export const genderOptions: string[] = ["Male", "Female"];

export const booleanOptions: string[] = ["True", "False"];
