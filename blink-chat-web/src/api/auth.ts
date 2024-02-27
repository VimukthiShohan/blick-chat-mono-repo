import { useMutation } from '@tanstack/react-query';
import { LoginBody, AuthResponse } from '@/types/user.types';

import { ApiServiceErr, axiosApi, MutOptions } from './apiService';

export const useLogin = (opt?: MutOptions<AuthResponse>) =>
  useMutation<AuthResponse, ApiServiceErr, LoginBody>(async (data) => {
    const response = await axiosApi.post('auth/login', data);
    return response.data;
  }, opt);
