import axios, { HttpStatusCode } from 'axios';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

import { BLINK_CHAT_API } from '@/config/constant';
import { ERROR_MSG } from '@/config/responseMessage';
import { getTokenInLocal } from '@/utils/cacheStorage';

export type Nullable<T> = T | null;

export interface ApiServiceErr {
  msg: string;
  status: HttpStatusCode;
}

export type MutOptions<Response, TVariables = unknown> = UseMutationOptions<
  Response,
  ApiServiceErr,
  TVariables,
  unknown
>;

export type QueryOptions<Response, TVariables = unknown> = UseQueryOptions<
  Response,
  ApiServiceErr,
  TVariables,
  any[]
>;

export type QueryOpt<Response> = UseQueryOptions<
  Response,
  ApiServiceErr,
  any,
  any
>;

const getApiError = (error: any, defaultMessage?: string) => {
  if (typeof error === 'string') {
    return error;
  }
  if (error?.msg) {
    return error.msg;
  }
  if (error?.response?.data) {
    if (typeof error.response.data === 'string') {
      return error.response.data;
    }
    if (typeof error.response.data.message === 'string') {
      return error.response.data.message;
    }
    if (typeof error.response.data.error === 'string') {
      return error.response.data.error;
    }
  }

  return defaultMessage || ERROR_MSG.SOMETHING_WRONG;
};

const getBearToken = (token: Nullable<string>) =>
  token ? `Bearer ${token}` : null;

const axiosApi = axios.create({ baseURL: BLINK_CHAT_API });

axiosApi.interceptors.response.use(undefined, (error) =>
  Promise.reject({
    msg: getApiError(error),
    status: error.response.status || 500,
  }),
);

axiosApi.interceptors.request.use((config: any) => {
  (config as any).headers.authorization = getBearToken(getTokenInLocal());
  return config;
});

export { axiosApi, getApiError };
