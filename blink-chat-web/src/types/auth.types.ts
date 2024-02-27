export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  createdAt: string;
  accessToken: string;
}

export type User = Omit<LoginResponse, 'accessToken'>;
