import {Reviews, Users} from '../models';

export interface IUserApiResponse {
  status: string;
  message: string;
  users?: Users[];
}

export interface IUserApiTokenResponse {
  status: string;
  message: string;
  tokens?: {accessToken: string; refreshToken?: string};
}

export interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IReviewApiResponse {
  status: string;
  message: string;
  reviews?: Reviews[];
}
