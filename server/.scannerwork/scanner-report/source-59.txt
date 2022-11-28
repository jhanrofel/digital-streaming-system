import { Users } from "../models";

export interface IUserApiResponse {
  status: string;
  message: string;
  users?: Users[];
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
