import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const accessToken = cookie.get("token");

axios.defaults.headers.common["Authorization"] = accessToken;
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // if (response.config.url === "/api/getCSRFToken") {
    //   axios.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken;
    // }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error);
    if (error.response.data.status === "error_auth") {
      localStorage.clear();
      window.location = "/";
    }
    return Promise.reject(error);
  }
);

export default axios;
