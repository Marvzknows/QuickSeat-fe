import axios from "axios";
import { AxiosInstance, RequestApi } from "../BaseApi";
import { BASE_URL } from "../../types/api";
import { UpcomingMoviesType } from "../../types/movies";

export const GetNowShowingMoviesListApi = async (props: RequestApi) => {
  const { page, limit } = props;
  try {
    const response = await AxiosInstance(props).get(
      `${BASE_URL}/api/nowshowing/getmovies?limit=${limit}&page=${page}`,
    );
    return response.data as UpcomingMoviesType;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else if (axios.isAxiosError(error)) {
      if (error.response?.data && error.response.data.isToken) {
        props.onTokenExpired();
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
