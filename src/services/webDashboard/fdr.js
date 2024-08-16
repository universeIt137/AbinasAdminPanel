import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export const createFdr = async (data) => {
  const accessToken = cookie.get("token");
  // console.log(data);
  const result = await axios
    .post("http://localhost:5000/api/v1/fdr", data, {
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

export const getFdr = async (status, type) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get(`http://localhost:5000/api/v1/fdr?status=${status}&fdrType=${type}`, {
      headers: { Authorization: accessToken },
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response?.data;
};

export const approveFdrForm = async (id) => {
  const accessToken = cookie.get("token");
  console.log(id);
  const response = await axios
    .patch(`http://localhost:5000/api/v1/fdr/approve/${id}`, {
      headers: { Authorization: accessToken },
    })
    .then((res) => {
      console.log(res);
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
      throw error.response.data;
    });

  return response;
};

export const updateFdr = async (data) => {
  const accessToken = cookie.get("token");
  const id = data?._id;
  console.log(id);
  delete data.id;
  const result = await axios
    .patch(`http://localhost:5000/api/v1/fdr/${id}`, data, {
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
