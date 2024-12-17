import axios from "axios";
import { AxiosInstance, RequestApi } from "../BaseApi";
import { BASE_URL } from "../../types/api";

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
    } else {
      console.error("Error:", error);
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
    } else {
      console.error("Error:", error);
    }
    throw error;
  }
};

// export const CreateAddDropApi = async (props: RequestApi) => {
//     const { apiUrl, data, endPoint } = props;

//     return await AxiosInstance(props)
//       .post(`${apiUrl}api/college/student/${endPoint}/add-drop-subject`, data)
//       .then((res) => res.data)
//       .catch((err) => ProcessApiError(err));
//   };
