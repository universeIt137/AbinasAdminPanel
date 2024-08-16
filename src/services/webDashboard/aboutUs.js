// import axios from "axios";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export const getAllAboutUs = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get(
      "http://localhost:5000/api/v1/about-us",
      {
        headers: { Authorization: accessToken },
      },
      {
        withCredentials: true,
      }
    )
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response?.data;
};

export const createAboutUs = async (data) => {
  const accessToken = cookie.get("token");
  const result = await axios
    .post("http://localhost:5000/api/v1/about-us", data, {
      headers: { Authorization: accessToken },
    })
    .then((response) => {
      toast.success(response.data.message);
      return response.data;
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      throw err.response.data;
    });
  return result;
};
export const deleteSingleAboutUs = async (id) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .delete(`http://localhost:5000/api/v1/about-us/${id}`, {
      headers: { Authorization: accessToken },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response;
};
