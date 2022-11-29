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
  loading: boolean;
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

export interface IMovieFilter {
  where: {
    comingSoon?: boolean;
    featured?: boolean;
  };
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
  approval?: string;
  reviewMovie: { title: string };
  reviewUser: { email: string };
}

export interface IReviewInitialState {
  list: IReviewFormTable[] | [];
  byId: IReviewFormTable | null;
  selected: string | null;
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

export interface IUserData {
  id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  approval?: string;
  status: string;
}

export interface IUserForm {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  approval?: string;
  password?: string;
}

export interface IUserFormPatch {
  id: string;
  role?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  approval?: string;
}

export interface IUserFormApprovePost {
  id: string;
  approval: string;
  role: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserLoggedData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface IUserRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface IUserInitialState {
  logged: IUserLoggedData | null;
  list: IUserData[] | [];
  byId: IUserData | null;
  selected: string | null;
}
