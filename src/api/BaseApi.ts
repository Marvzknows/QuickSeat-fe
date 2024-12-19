import axios from "axios";
import qs from "qs";

export type RequestApi<TData = Record<string, unknown> | FormData> = {
  abortController?: AbortController;
  apiUrl?: string;
  token: string;
  signal?: AbortSignal;
  params?: Record<string, string | number | boolean>;
  limit?: number;
  page?: number;
  endPoint?: string;
  data?: TData;
  onTokenExpired: () => void;
};
export const AxiosInstance = <TData = Record<string, unknown>>(
  props: RequestApi<TData>,
) => {
  const { token, signal, params } = props;

  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    paramsSerializer: {
      serialize: (params) => qs.stringify(params),
    },
    signal,
    params,
  });

  return instance;
};
