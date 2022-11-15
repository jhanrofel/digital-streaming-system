import { IMovieData } from "../utilities/types";

export const mockMoviesList: IMovieData[] = [
  {
    id: "636e750651ac7c717cf8016e1",
    title: "Spider Man",
    cost: "1000000000",
    yearReleased: "2005",
    comingSoon: false,
    featured: false,
    imageLink: "movie_trailer_link",
    trailerLink: "movie_trailer_link",
    movieActors: [
      {
        id: "636e750651ac7c717cf8016a1",
        firstName: "Tom",
        lastName: "Hollands",
        gender: "Male",
        birthday: "01-01-1990",
        imageLink: "actor_image_link",
      },
    ],
  },
  {
    id: "636e750651ac7c717cf8016e2",
    title: "Spider Man 2",
    cost: "1500000000",
    yearReleased: "2015",
    comingSoon: false,
    featured: false,
    imageLink: "movie_trailer_link",
    trailerLink: "movie_trailer_link",
    movieActors: [
      {
        id: "636e750651ac7c717cf8016a1",
        firstName: "Tom",
        lastName: "Hollands",
        gender: "Male",
        birthday: "01-01-1990",
        imageLink: "actor_image_link",
      },
    ],
  },
];

export const mockMoviesOne: IMovieData = {
  id: "636e750651ac7c717cf8016e1",
  title: "Spider Man",
  cost: "1000000000",
  yearReleased: "2005",
  comingSoon: false,
  featured: false,
  imageLink: "movie_trailer_link",
  trailerLink: "movie_trailer_link",
  movieActors: [
    {
      id: "636e750651ac7c717cf8016a1",
      firstName: "Tom",
      lastName: "Hollands",
      gender: "Male",
      birthday: "01-01-1990",
      imageLink: "actor_image_link",
    },
  ],
};

export const mockMovieDeleteId = { id: "636e750651ac7c717cf8016e2" };

export const mockMovieRating = {
  _id: 5,
  count: 2,
  total: 10,
  average: 5,
};

export const mockMovieReviews = [
  {
    id: "review_id_1",
    description: "Good movie",
  },
  {
    id: "review_id_2",
    description: "Amazing movie",
  },
];

export const mockMovieIdSelected = { id: "636e750651ac7c717cf8016e1" };
