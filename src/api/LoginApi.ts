import { BASE_URL } from "../types/api";
import { AxiosInstance, RequestApi } from "./BaseApi";
import axios from "axios";

export const LoginApi = async (props: RequestApi) => {
  // const { apiUrl, signal, params, data, endPoint } = props;
  const axiosInstance = AxiosInstance(props);

  try {
    const response = await axiosInstance.post(`${BASE_URL}/api/login`, {
      data: props.data,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else {
      console.error("Error:", error);
    }
    throw error;
  }
};

// Usage Example:
// export const makeRequest = async (props: RequestApi) => {
//     const { apiUrl, signal, params, data, endPoint } = props;
//     const axiosInstance = AxiosInstance(props);

//     try {
//         const response = await axiosInstance.get(`${apiUrl}/${endPoint}`, {
//             params,
//             signal,
//         });
//         return response.data;
//     } catch (error) {
//         if (axios.isCancel(error)) {
//             console.error('Request canceled', error.message);
//         } else {
//             console.error('Error:', error);
//         }
//         throw error;
//     }
// };
