import axios from "axios";
import { AxiosInstance, RequestApi } from "../BaseApi";
import { BASE_URL } from "../../types/api";
import { UpcomingMoviesType } from "../../types/movies";

export const AddUpcommingApi = async (props: RequestApi) => {
  const { signal, data } = props;
  const axiosInstance = AxiosInstance(props);

  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/api/addupcoming`,
      data,
      {
        signal,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else if (axios.isAxiosError(error)) {
      if (error.response?.data && !error.response.data.isToken) {
        props.onTokenExpired();
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const GetGenresListApi = async (props: RequestApi) => {
  try {
    const response = await AxiosInstance(props).get(`${BASE_URL}/api/genres`);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else if (axios.isAxiosError(error)) {
      if (error.response?.data && !error.response.data.isToken) {
        props.onTokenExpired();
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const GetUpcomingMoviesListApi = async (props: RequestApi) => {
  const { page, limit } = props;
  try {
    const response = await AxiosInstance(props).get(
      `${BASE_URL}/api/getupcoming?limit=${limit}&page=${page}`,
    );
    return response.data as UpcomingMoviesType;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else if (axios.isAxiosError(error)) {
      if (error.response?.data && !error.response.data.isToken) {
        props.onTokenExpired();
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
