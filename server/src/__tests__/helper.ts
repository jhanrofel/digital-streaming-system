import {givenHttpServerConfig} from '@loopback/testlab';
import {DigitalStreamingSystemApplication} from '../application';
import {Actors, Movies, Reviews, Users} from '../models';
import {
  ReviewsRepository,
  UserCredentialsRepository,
  UsersRepository,
} from '../repositories';
import {testdb} from './datasource/testdb.datasource';

export const givenActors: Partial<Actors>[] = [
  {
    id: '6372d12e3cefe26cd4ed73ef',
    firstName: 'Tom',
    lastName: 'Holland',
    gender: 'Male',
    birthday: '1996-05-31T16:00:00.000+00:00',
    imageLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg',
  },
  {
    id: '6372d1473cefe26cd4ed73f0',
    firstName: 'Christopher',
    lastName: 'Hemsworth',
    gender: 'Male',
    birthday: '1983-08-10T16:00:00.000+00:00',
    imageLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Chris_Hemsworth_by_Gage_Skidmore_2_%28cropped%29.jpg/330px-Chris_Hemsworth_by_Gage_Skidmore_2_%28cropped%29.jpg',
  },
  {
    id: '63736c219f38dedc4cde4413',
    firstName: 'Keanu',
    lastName: 'Reeves',
    gender: 'Male',
    birthday: '1964-09-01T16:30:00.000+00:00',
    imageLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_cropped_2_%2846806576944%29_%28cropped%29.jpg/330px-Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_cropped_2_%2846806576944%29_%28cropped%29.jpg',
  },
];

export const givenActorById: Partial<Actors> = {
  id: '6372d12e3cefe26cd4ed73ef',
  firstName: 'Tom',
  lastName: 'Holland',
  gender: 'Male',
  birthday: '1996-05-31T16:00:00.000+00:00',
  imageLink:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg',
};

export function givenActorPost(actor?: Partial<Actors>) {
  const data = Object.assign(
    {
      firstName: 'Dwayne',
      lastName: 'Johnson.',
      gender: 'Male',
      birthday: '1972-05-01T16:30:00.000+00:00',
      imageLink:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/330px-Dwayne_Johnson_2014_%28cropped%29.jpg',
    },
    actor,
  );
  return new Actors(data);
}

export const mockSelectedActor = {id: '6372d12e3cefe26cd4ed73ef'};

export const givenMovies: Partial<Movies>[] = [
  {
    id: '6372d1703cefe26cd4ed73f1',
    title: 'Spider-Man Homecoming',
    cost: 40000000000,
    yearReleased: 2017,
    comingSoon: false,
    featured: true,
    createdAt: '11/15/2022, 7:38:24 AM',
    imageLink:
      'https://upload.wikimedia.org/wikipedia/en/f/f9/Spider-Man_Homecoming_poster.jpg',
    trailerLink: 'https://www.youtube.com/watch?v=rk-dF1lIbIg',
  },
  {
    id: '63763a1a529edaed841fbe8b',
    title: 'The Do Over',
    cost: 6400000000,
    yearReleased: 2016,
    comingSoon: false,
    featured: false,
    createdAt: '11/17/2022, 9:41:46 PM',
    imageLink:
      'https://upload.wikimedia.org/wikipedia/en/1/12/The_Do-Over_Poster.png',
    trailerLink: 'https://www.youtube.com/watch?v=NBBWHHdhziU',
  },
  {
    id: '63763ab2529edaed841fbe97',
    title: 'John Wicked',
    cost: 8600000000,
    yearReleased: 2014,
    comingSoon: false,
    featured: true,
    createdAt: '11/17/2022, 9:44:18 PM',
    imageLink:
      'https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg',
    trailerLink: 'https://www.youtube.com/watch?v=2AUmvWm5ZDQ',
  },
];

export const givenMovieById: Partial<Movies> = {
  id: '63763ab2529edaed841fbe97',
  title: 'John Wicked',
  cost: 8600000000,
  yearReleased: 2014,
  comingSoon: false,
  featured: true,
  createdAt: '11/17/2022, 9:44:18 PM',
  imageLink:
    'https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg',
  trailerLink: 'https://www.youtube.com/watch?v=2AUmvWm5ZDQ',
};

export function givenMoviePost(movie?: Partial<Movies>) {
  const data = Object.assign(
    {
      title: 'Jumanji: Welcome to the Jungle edited',
      cost: 20000000000,
      yearReleased: 2016,
      comingSoon: false,
      featured: false,
      createdAt: '11/18/2022, 11:12:31 AM',
      imageLink:
        'https://upload.wikimedia.org/wikipedia/en/d/dc/Jumanji_Welcome_to_the_Jungle.png',
      trailerLink: 'https://www.youtube.com/watch?v=2QKg5SZ_35I',
    },
    movie,
  );
  return new Movies(data);
}

export const mockSelectedMovie = {id: '6376f81ffd48d8018970e156'};

export const givenReviews: Partial<Reviews>[] = [
  {
    id: '6376fa14fd48d8018970e164',
    description: 'Greate movie!',
    rating: 5,
    createdAt: '11/18/2022, 11:20:52 AM',
    approval: 'approved',
    movie: '63763ab2529edaed841fbe97',
    user: '63763ab2529edaed841fbu97',
  },
  {
    id: '6376fa14fd48d8018970e162',
    description: 'Amazing movie!',
    rating: 5,
    createdAt: '11/18/2022, 11:21:52 AM',
    approval: 'approved',
    movie: '63763ab2529edaed841fbe98',
    user: '63763ab2529edaed841fbu98',
  },
  {
    id: '6376fa14fd48d8018970e163',
    description: 'Wow!',
    rating: 5,
    createdAt: '11/18/2022, 11:23:52 AM',
    approval: 'approved',
    movie: '63763ab2529edaed841fbe99',
    user: '63763ab2529edaed841fbu99',
  },
];

export const givenReviewById: Partial<Reviews> = {
  id: '6376fa14fd48d8018970e163',
  description: 'Wow!',
  rating: 5,
  createdAt: '11/18/2022, 11:23:52 AM',
  approval: 'approved',
  movie: '63763ab2529edaed841fbe99',
  user: '63763ab2529edaed841fbu99',
};

export function givenReviewPost(review?: Partial<Reviews>) {
  const data = Object.assign(
    {
      description: 'Wow!',
      rating: 5,
      createdAt: '11/18/2022, 11:23:52 AM',
      approval: 'approved',
      movie: '63763ab2529edaed841fbe99',
      user: '63763ab2529edaed841fbu99',
    },
    review,
  );
  return new Reviews(data);
}

export const mockSelectedReview = {id: '6372d12e3cefe26cd4ed73ef'};

export const givenUsers: Partial<Users>[] = [
  {
    id: 'user_id_1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@mail.com',
    approval: 'approved',
    status: 'ACTIVATED',
  },
  {
    id: 'user_id_2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@mail.com',
    approval: 'approved',
    status: 'ACTIVATED',
  },
  {
    id: 'user_id_3',
    firstName: 'Mike',
    lastName: 'Ross',
    email: 'mike@mail.com',
    approval: 'approved',
    status: 'ACTIVATED',
  },
];

export const givenUserById: Partial<Users> = {
  id: '6376f7b0fd48d8018970e154',
  firstName: 'Mike',
  lastName: 'Ross',
  email: 'mike@mail.com',
  approval: 'approved',
  status: 'ACTIVATED',
};

export function givenUserPost(review?: Partial<Users>) {
  const data = Object.assign(
    {
      firstName: 'Rofel',
      lastName: 'Alingasa',
      email: 'rofel@mail.com',
      approval: 'approved',
      status: 'ACTIVATED',
    },
    review,
  );
  return new Users(data);
}

export const mockSelectedUser = {id: 'user_id_selected'};

export const mockUser = {
  firstName: 'Tony',
  lastName: 'Stark',
  email: 'tony@mail.com',
  approval: 'approved',
  status: 'ACTIVATED',
};

export const mockUserRegistrationApproval = {
  id:'new_register_id',
  firstName: 'Tony',
  lastName: 'Stark',
  email: 'tony@mail.com',
  approval: 'pending',
  status: 'ACTIVATED',
};

export function givenUsersData(data?: Partial<Users>) {
  return Object.assign(
    {
      firstName: 'Rofel',
      lastName: 'Alingasa',
      email: 'rofel@mail.com',
      approval: 'approved',
      status: 'ACTIVATED',
    },
    data,
  );
}

export async function givenUsersRepositories(
  app: DigitalStreamingSystemApplication,
) {
  const usersRepository = await app.getRepository(UsersRepository);
  return {usersRepository};
}

export async function givenEmptyDatabase() {
  let userCredentialsRepository: UserCredentialsRepository;
  let reviewsRepository: ReviewsRepository;

  const usersRepository = new UsersRepository(
    testdb,
    async () => userCredentialsRepository,
    async () => reviewsRepository,
  );

  await usersRepository.deleteAll();
}

export async function givenRunningApplicationWithCustomConfiguration() {
  const app = new DigitalStreamingSystemApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();

  app.bind('datasources.config.mongodb').to({
    name: 'mongoDb',
    connector: 'memory',
  });

  await app.start();
  return app;
}
