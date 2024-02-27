export interface AuthResponse {
  email: string;
  firstName: string;
  lastName: string;
  profilePic: string;
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
