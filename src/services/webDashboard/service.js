// import axios from "axios";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const cookie = new Cookies();
const axiosPublic = useAxiosPublic();

export const getAllServices = async () => {
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .get(
      "/services",
      {
        headers: { Authorization: accessToken },
      }
      // {
      //   withCredentials: true,
      // }
    )
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response?.data;
};

export const createService = async (data) => {
  const accessToken = cookie.get("token");
  const result = await axiosPublic
    .post("/services/createservice", data, {
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


export const deleteSingleService = async (id) => {
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .delete(`/services/${id}`, {
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

export const getAllAppliedServices = async () => {
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .get(
      "/apply-service",
      {
        headers: { Authorization: accessToken },
      }
      // {
      //   withCredentials: true,
      // }
    )
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response?.data;
};
