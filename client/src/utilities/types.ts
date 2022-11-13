export interface IActorForm {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  imageLink: string;
}

export interface IActorData {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  imageLink: string;
  actorMovies?: IMovieForm;
  age?: number;
}

export interface IActorInitialState {
  list: IActorData[] | [];
  byId: IActorData | null;
  movies: IMovieForm[] | [];
  selected: string | null;
}

export interface IAlert {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

export interface IAutoCompleteOption {
  label: string;
  id: string;
}

export interface IButton {
  label: string;
  onClick: any;
}

export interface ICard {
  id?: string;
  title: string;
  subtitle: string;
  url: string;
}

export interface ICategory {
  id?: string;
  name: string;
}

export interface ICategoryInitialState {
  data: ICategory[] | [];
  dataOne: ICategory;
}

export interface ILoginFormErrors {
  email: string;
  password: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
  alert: IAlert;
}

export interface IMovieForm {
  id?: string;
  title: string;
  cost: string;
  yearReleased: string;
  comingSoon?: string;
  featured?: string;
  imageLink: string;
  trailerLink?: string;
  actors: IAutoCompleteOption[];
}

export interface IMovieFormErrors {
  id?: string;
  title: string;
  cost: string;
  yearReleased: string;
  comingSoon?: string;
  featured?: string;
  imageLink: string;
  trailerLink?: string;
  actors: string;
}

export interface IMovieDataPost {
  id?: string;
  title: string;
  cost: number;
  yearReleased: number;
  comingSoon?: boolean;
  featured?: boolean;
  imageLink: string;
  trailerLink?: string;
  movieActors: string[];
}

export interface IMovieData {
  id?: string;
  title: string;
  cost: string;
  yearReleased: string;
  comingSoon?: boolean;
  featured?: boolean;
  imageLink: string;
  trailerLink?: string;
  movieActors: IActorData[];
  movieReviews?: IActorData[];
}

export interface IMovieReviewForm {
  review: string;
  rating: number;
}

export interface IMovieReviewFormErrors {
  review: string;
  rating: string;
}

export interface IMovieRatingData {
  review: string;
  rating: number | null;
  alert: IAlert;
}

export interface IMovieInitialState {
  list: IMovieData[] | [];
  byId: IMovieData | null;
  reviews: IReviewForm[] | [];
  comingSoon: IMovieData[] | [];
  featured: IMovieData[] | [];
  selected: string | null;
  rating: IReviewRating | null;
}

export interface IObjectAny {
  [key: string]: any;
}

export interface IRegisterFormErrors {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
}

export interface IRegisterFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
  alert: IAlert;
}

export interface IReviewForm {
  id?: string;
  description: string;
}

export interface IReviewFormPost {
  description: string;
  rating: number | null;
  movie: string;
}

export interface IReviewFormApprovePost {
  id: string;
  approval: string;
}

export interface IReviewFormTable {
  id: string;
  description: string;
  rating: number;
  createdAt: string;
  reviewMovie: { title: string };
  reviewUser: { email: string };
}

export interface IReviewInitialState {
  data: IReviewFormTable[] | [];
  dataOne: IReviewFormTable;
}

export interface IReviewRating {
  _id: string | null;
  count: number;
  total: number;
  average: number;
}

export interface ITableTabInfo {
  label: string;
  formPages: JSX.Element;
}

export interface IUserFormErrors {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserFormValues {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  alert: IAlert;
}

export interface IUserFormPatch {
  id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  approval?: string;
  password?: string;
}

export interface IUserFormPost {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  approval: string;
  password: string;
}

export interface IUserFormRegister {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IUserFormApprovePost {
  id: string;
  approval: string;
  role: string;
}

export interface IUserFormTable {
  id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  status?: string;
}
