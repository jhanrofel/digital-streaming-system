import { IActorData } from "../utilities/types";

export const mockActorsList: IActorData[] = [
  {
    id: "636e750651ac7c717cf8016e",
    firstName: "Robert",
    lastName: "Downey Jr.",
    gender: "Male",
    birthday: "1978-06-08T17:59:42.000+00:00",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/330px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
  },
  {
    id: "636e896b53a5faab3c012736",
    firstName: "Dwayne",
    lastName: "Johnson",
    gender: "Male",
    birthday: "1955-02-17T16:30:00.000+00:00",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/330px-Dwayne_Johnson_2014_%28cropped%29.jpg",
  },
  {
    id: "636e95debf0896b590923d70",
    firstName: "Adam",
    lastName: "Sandler",
    gender: "Male",
    birthday: "1966-09-08T16:30:00.000+00:00",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adam_Sandler_Cannes_2017.jpg/330px-Adam_Sandler_Cannes_2017.jpg",
  },
];

export const mockNewActor = {
  id: "new_actor_id",
  firstName: "Tom",
  lastName: "Holland.",
  gender: "Male",
  birthday: "1996-06-01T17:59:42.000+00:00",
  imageLink:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg",
};

export const mockEditedActor = {
  id: "636e750651ac7c717cf8016e",
  firstName: "Robert - edited",
  lastName: "Downey Jr. - edited",
  gender: "Male",
  birthday: "1978-06-08T17:59:42.000+00:00",
  imageLink:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/330px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
};

export const mockActorsListAfterEdit: IActorData[] = [
  {
    id: "636e750651ac7c717cf8016e",
    firstName: "Robert - edited",
    lastName: "Downey Jr. - edited",
    gender: "Male",
    birthday: "1978-06-08T17:59:42.000+00:00",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/330px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
  },
  {
    id: "636e896b53a5faab3c012736",
    firstName: "Dwayne",
    lastName: "Johnson",
    gender: "Male",
    birthday: "1955-02-17T16:30:00.000+00:00",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/330px-Dwayne_Johnson_2014_%28cropped%29.jpg",
  },
  {
    id: "636e95debf0896b590923d70",
    firstName: "Adam",
    lastName: "Sandler",
    gender: "Male",
    birthday: "1966-09-08T16:30:00.000+00:00",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adam_Sandler_Cannes_2017.jpg/330px-Adam_Sandler_Cannes_2017.jpg",
  },
];

export const mockActorIdToDelete = { id: "636e95debf0896b590923d70" };

export const mockActorsAfterDelete: IActorData[] = [
  {
    id: "636e750651ac7c717cf8016e",
    firstName: "Robert",
    lastName: "Downey Jr.",
    gender: "Male",
    birthday: "1978-06-08T17:59:42.000+00:00",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/330px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
  },
  {
    id: "636e896b53a5faab3c012736",
    firstName: "Dwayne",
    lastName: "Johnson",
    gender: "Male",
    birthday: "1955-02-17T16:30:00.000+00:00",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/330px-Dwayne_Johnson_2014_%28cropped%29.jpg",
  },
];

export const mockActorIdSelected = "636e896b53a5faab3c012736";

export const mockActorsSelected: IActorData = {
  id: "636e750651ac7c717cf8016e",
  firstName: "Robert",
  lastName: "Downey Jr.",
  gender: "Male",
  birthday: "1978-06-08T17:59:42.000+00:00",
  imageLink:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/330px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
};

export const mockActorsMovies: IActorData = {
  id: "636e750651ac7c717cf8016e",
  firstName: "Robert",
  lastName: "Downey Jr.",
  gender: "Male",
  birthday: "1978-06-08T17:59:42.000+00:00",
  imageLink:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/330px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
  actorMovies: {
    id: "63706913913b60ce38dea098",
    title: "Iron Man",
    cost: "180000000000",
    yearReleased: "1999",
    comingSoon: "False",
    featured: "False",
    imageLink: "iron_man_image_link",
    trailerLink: "iron_man_trailer_link",
    actors:[]
  },
};
