import { useMutation } from '@tanstack/react-query';
import { AuthResponse, RegisterBody } from '@/types/user.types';

import { ApiServiceErr, axiosApi, MutOptions } from './apiService';

export const useRegister = (opt?: MutOptions<AuthResponse>) =>
  useMutation<AuthResponse, ApiServiceErr, RegisterBody>(async (data) => {
    const response = await axiosApi.post('user/register', data);
    return response.data;
  }, opt);
