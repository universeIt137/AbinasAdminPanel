import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const cookies = new Cookies();
const axiosPublic = useAxiosPublic();

export const login = async (data) => {
 
  // const response = await axios
  //   .post("https://abinas-server.vercel.app/api/v1/user/login", data)
  //   .catch((error) => {
  //     toast.error("Something went wrong! Please try again");
  //     throw error.response.data;
  //   });

  const response = await axiosPublic
    .post("/user/login", data)
    .catch((error) => {
      toast.error("Something went wrong! May be your server is down.");
      throw error.response.data;
    });

  let userData = response.data.data;
  if (userData?.role === "admin") {
    cookies.set("name", userData.name, { path: "/" });
    cookies.set("userId", userData._id, { path: "/" });
    cookies.set("role", userData.role, { path: "/" });
    cookies.set("phone", userData.phone, { path: "/" });
    cookies.set("token", userData.accessToken, { path: "/" });
    return response.data;
  } else {
    toast.error("Only Admin can Login!");
    throw new Error("Please Ensure you ar Admin");
  }
};

export const logout = async () => {
  const response = await axiosPublic
    .post("/user/logout")
    .then((res) => {
      cookies.remove("name", { path: "/" });
      cookies.remove("userId", { path: "/" });
      cookies.remove("role", { path: "/" });
      cookies.remove("phone", { path: "/" });
      cookies.remove("token", { path: "/" });
      return res.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
  return response.data;
};

export const createMembership = async (data) => {
  const response = await axiosPublic
    .post("/user/signup", data)
    .catch((error) => {
      toast.error("error! use deffrent phone");
      throw error.response.data;
    });

  return response.data;
};
