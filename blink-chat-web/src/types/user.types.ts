import { Nullable } from '@/api/apiService';

export interface AuthResponse {
  email: string;
  firstName: string;
  lastName: string;
  profilePic: Nullable<string>;
  createdAt: string;
  accessToken: string;
}

export interface LoginBody extends Pick<AuthResponse, 'email'> {
  password: string;
}

export type User = Omit<AuthResponse, 'accessToken'>;

export type RegisterBody = Pick<
  AuthResponse,
  'firstName' | 'lastName' | 'email'
> &
  Pick<LoginBody, 'password'>;

export type UserUpdateBody = Pick<
  AuthResponse,
  'firstName' | 'lastName' | 'email' | 'profilePic'
>;

export type UserUpdateResponse = Omit<AuthResponse, 'accessToken'>;

export type UserInfoResponse = UserUpdateResponse;
