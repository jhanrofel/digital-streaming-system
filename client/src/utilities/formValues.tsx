import {
  IActorForm,
  IAlert,
  ILoginFormErrors,
  ILoginFormValues,
  IMovieForm,
  IMovieFormErrors,
  IMovieReviewForm,
  IMovieReviewFormErrors,
  IRegisterFormErrors,
  IRegisterFormValues,
  IUserFormErrors,
  IUserFormValues,
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

export const loginFormErrors: ILoginFormErrors = {
  email: "",
  password: "",
};

export const loginFormValues: ILoginFormValues = {
  email: "",
  password: "",
  alert: {
    open: false,
    message: "",
    severity: "info",
  },
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


export const registerFormErrors: IRegisterFormErrors = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirm: "",
};

export const registerFormValues: IRegisterFormValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirm: "",
  alert: {
    open: false,
    message: "",
    severity: "info",
  },
};

export const userFormErrors: IUserFormErrors = {
  role: "",
  email: "",
  firstName: "",
  lastName: "",
};

export const userFormValues: IUserFormValues = {
  role: "USER",
  email: "",
  firstName: "",
  lastName: "",
  alert: {
    open: false,
    message: "",
    severity: "info",
  },
};
