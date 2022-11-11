export interface IActorFormErrors {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  catalogue: string;
}

export interface IActorFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  catalogue: string;
  link?: string;
  alert: IAlert;
}

export interface IActorPostForm {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  imageLink: string;
  actorMovies?: IMovieForm;
  age?: number;
}

export interface IActorFormPost {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  link?: string;
  actorLink: ILinkActor;
  actorMovies?: IMovieForm;
  age?: number;
}

export interface IActorInitialState {
  logged: boolean;
  data: IActorFormPost[] | [];
  dataOne: IActorFormPost;
  dataMovies: IMovieForm[] | [];
  selectedId: string | null;
  byId: IActorPostForm | null;
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

export interface ICategory {
  id?: string;
  name: string;
}

export interface ICategoryInitialState {
  data: ICategory[] | [];
  dataOne: ICategory;
}

export interface ILinkActor {
  catalogue: string;
}

export interface ILinkMovie {
  catalogue: string;
  trailer?: string;
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

export interface IMovieActors {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IMovieActorForm {
  firstName: string;
  lastName: string;
}

export interface IMovieForm {
  id:string;
  title: string;
  cost: string;
  yearReleased: string;
  link: string;
  movieLink: ILinkMovie;
}

export interface IMovieFormErrors {
  title: string;
  cost: string;
  yearReleased: string;
  catalogue: string;
  actors: string;
}

export interface IMovieFormValues {
  title: string;
  cost: number;
  yearReleased: number;
  comingSoon: string;
  featured: string;
  categories: IAutoCompleteOption[];
  catalogue: string;
  trailer?: string;
  actors: IAutoCompleteOption[];
  alert: IAlert;
}

export interface IMovieFormPatch {
  id?: string;
  link?: string;
  title: string;
  cost: number;
  yearReleased: number;
  comingSoon: boolean;
  featured: boolean;
  categories: string[];
  trailer?: string;
  actors: string[];
  movieLink: ILinkMovie;
  movieActors: string[];
}

export interface IMovieFormPost {
  id?: string;
  link?: string;
  title: string;
  cost: number;
  yearReleased: number;
  comingSoon: boolean;
  featured: boolean;
  categories: string[];
  trailer?: string;
  actors: string[];
  movieLink: ILinkMovie;
}

export interface IMovieFormTable {
  id?: string;
  link?: string;
  title: string;
  cost: number;
  yearReleased: number;
  comingSoon: boolean;
  featured: boolean;
  categories: string[];
  trailer?: string;
  actors: string[];
  movieLink: ILinkMovie;
  movieActors: IMovieActors[];
}

export interface IMovieDetailsFormErrors {
  review: string;
  rating: string;
}

export interface IMovieDetailsFormValues {
  review: string;
  rating: number | null;
  alert: IAlert;
}

export interface IMovieInitialState {
  data: IMovieFormPost[] | [];
  dataLatestUploads: IMovieFormPost[] | [];
  dataFeatured: IMovieFormPost[] | [];
  dataComingSoon: IMovieFormPost[] | [];
  dataReviews: IReviewForm[] | [];
  dataOne: IMovieFormPost;
  dataGetOne: any;
  dataRating: IReviewRating | [];
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

