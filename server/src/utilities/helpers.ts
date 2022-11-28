import {IUserApiResponse} from '../utilities/types';

export const catchError = (error:any): IUserApiResponse => {
  if (error.code === 11000) {
    return {
      status: 'error',
      message: `${error.keyValue.email} email already in used.`,
    };
  } else {
    return {status: 'error', message: error.message};
  }
};
