import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiServiceErr, axiosApi, MutOptions } from './apiService';
import {
  AuthResponse,
  RegisterBody,
  UserInfoResponse,
  UserUpdateBody,
  UserUpdateResponse,
} from '@/types/user.types';

export const useRegister = (opt?: MutOptions<AuthResponse>) =>
  useMutation<AuthResponse, ApiServiceErr, RegisterBody>(async (data) => {
    const response = await axiosApi.post('user/register', data);
    return response.data;
  }, opt);

export const useUpdateUser = (opt?: MutOptions<UserUpdateResponse>) =>
  useMutation<UserUpdateResponse, ApiServiceErr, UserUpdateBody>(
    async (data) => {
      const { email, ...rest } = data;
      const response = await axiosApi.patch(`user/${email}`, rest);
      return response.data;
    },
    opt,
  );

export const useGetUser = (email: string) =>
  useQuery<UserInfoResponse, ApiServiceErr>([`user/${email}`], async () => {
    const response = await axiosApi.get(`user/${email}`);
    return response.data;
  });
