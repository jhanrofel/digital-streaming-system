import {
  IActorForm,
  IAlert,
  ILoginFormErrors,
  ILoginFormValues,
  IMovieFormErrors,
  IMovieFormValues,
  IMovieDetailsFormErrors,
  IMovieDetailsFormValues,
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

export const movieFormErrors: IMovieFormErrors = {
  title: "",
  cost: "",
  yearReleased: "",
  catalogue: "",
  actors: "",
};

export const movieFormValues: IMovieFormValues = {
  title: "",
  cost: 0,
  yearReleased: 2022,
  comingSoon: "False",
  featured: "False",
  categories: [],
  catalogue: "",
  trailer: "",
  actors: [],
  alert: {
    open: false,
    message: "",
    severity: "info",
  },
};

export const movieDetailsFormErrors: IMovieDetailsFormErrors = {
  review: "",
  rating: "",
};

export const movieDetailsFormValues: IMovieDetailsFormValues = {
  review: "",
  rating: null,
  alert: {
    open: false,
    message: "",
    severity: "info",
  },
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
