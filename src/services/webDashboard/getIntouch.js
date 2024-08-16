// import axios from "axios";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
const cookie = new Cookies();

// Job Circular
export const getAllJobCircular = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get(
      "http://localhost:5000/api/v1/get-in-touch/job-circular",
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

export const createJobCircular = async (data) => {
  const accessToken = cookie.get("token");
  const result = await axios
    .post("http://localhost:5000/api/v1/get-in-touch/job-circular", data, {
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
export const deleteSingleJobCircular = async (id) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .delete(`http://localhost:5000/api/v1/get-in-touch/job-circular/${id}`, {
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

// Notice ------------------------------------
export const getAllNotice = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get(
      "http://localhost:5000/api/v1/get-in-touch/notice",
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

export const createNotice = async (data) => {
  const accessToken = cookie.get("token");
  const result = await axios
    .post("http://localhost:5000/api/v1/get-in-touch/notice", data, {
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
export const deleteSingleNotice = async (id) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .delete(`http://localhost:5000/api/v1/get-in-touch/notice/${id}`, {
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
// Csr ------------------------------------
export const getAllCsr = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get(
      "http://localhost:5000/api/v1/get-in-touch/csr",
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

export const createCsr = async (data) => {
  const accessToken = cookie.get("token");
  const result = await axios
    .post("http://localhost:5000/api/v1/get-in-touch/csr", data, {
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
export const deleteSingleCsr = async (id) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .delete(`http://localhost:5000/api/v1/get-in-touch/csr/${id}`, {
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

// Contact Us ------------------------------------
export const getAllContactUs = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get(
      "http://localhost:5000/api/v1/get-in-touch/contact",
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

export const createContactUs = async (data) => {
  const accessToken = cookie.get("token");
  const result = await axios
    .post("http://localhost:5000/api/v1/get-in-touch/contact", data, {
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
export const deleteSingleContactUs = async (id) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .delete(`http://localhost:5000/api/v1/get-in-touch/contact/${id}`, {
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
