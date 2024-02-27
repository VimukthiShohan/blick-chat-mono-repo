import { useMutation } from '@tanstack/react-query';
import { LoginBody, LoginResponse } from '@/types/auth.types';

import { ApiServiceErr, axiosApi, MutOptions } from './apiService';

export const useLogin = (opt?: MutOptions<LoginResponse>) =>
  useMutation<LoginResponse, ApiServiceErr, LoginBody>(async (data) => {
    const response = await axiosApi.post('auth/login', data);
    return response.data;
  }, opt);
