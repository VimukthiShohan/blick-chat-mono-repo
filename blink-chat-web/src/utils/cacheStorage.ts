import { User } from '@/types/user.types';

const TOKEN = 'token';
const USER = 'user';

export const getTokenInLocal = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN);
  }
};

export const saveTokenInLocal = (userToken: string) =>
  localStorage.setItem(TOKEN, userToken);

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const userObj = localStorage.getItem(USER);
    if (userObj) {
      return JSON.parse(userObj);
    }
    return null;
  }
};

export const saveUser = (userDetails: User) =>
  localStorage.setItem(USER, JSON.stringify(userDetails));
