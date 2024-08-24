// import axios from "axios";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const cookie = new Cookies();
const axiosPublic = useAxiosPublic();

export const getAllConcern = async () => {
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .get(
      "/our-concern",
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

export const createConcern = async (data) => {
  const accessToken = cookie.get("token");
  const result = await axiosPublic
    .post("/our-concern", data, {
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
export const deleteSingleConcern = async (id) => {
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .delete(`/our-concern/${id}`, {
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
