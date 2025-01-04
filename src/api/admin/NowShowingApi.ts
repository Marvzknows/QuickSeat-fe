import axios from "axios";
import { BASE_URL } from "../../types/api";
import { AxiosInstance, RequestApi } from "../BaseApi";

export const DeleteNowShowingApi = async (props: RequestApi) => {
  const { endPoint } = props;
  try {
    const response = await AxiosInstance(props).delete(
      `${BASE_URL}/api/nowshowing/deletemovie/${endPoint}`,
    );
    return response.data;
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
