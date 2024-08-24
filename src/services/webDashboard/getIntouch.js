// import axios from "axios";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
import { useActionData } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const cookie = new Cookies();

// Job Circular
export const getAllJobCircular = async () => {
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .get(
      "/get-in-touch/job-circular",
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const result = await axiosPublic
    .post("/get-in-touch/job-circular", data, {
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .delete(`/get-in-touch/job-circular/${id}`, {
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .get(
      "/get-in-touch/notice",
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const result = await axiosPublic
    .post("/get-in-touch/notice", data, {
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .delete(`/get-in-touch/notice/${id}`, {
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .get(
      "/get-in-touch/csr",
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const result = await axiosPublic
    .post("/get-in-touch/csr", data, {
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .delete(`/get-in-touch/csr/${id}`, {
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .get(
      "/get-in-touch/contact",
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const result = await axiosPublic
    .post("/get-in-touch/contact", data, {
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
  const axiosPublic = useAxiosPublic();
  const accessToken = cookie.get("token");
  const response = await axiosPublic
    .delete(`/get-in-touch/contact/${id}`, {
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
