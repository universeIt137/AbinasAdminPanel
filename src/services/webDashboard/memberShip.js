import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export const getMemberShip = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get(
      "http://localhost:5000/api/v1/userapplication/getuserapplication",
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
  return response.data;
};

export const getSingleMemberShip = async (phone) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get(
      `http://localhost:5000/api/v1/userapplication/getuserapplication/${phone}`,
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
  return response.data;
};
export const updateMemberShipStatus = async (data) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .patch(
      `http://localhost:5000/api/v1/userapplication/updatestatus/${data?.id}`,
      { status: data?.type },
      {
        headers: { Authorization: accessToken },
      },
      {
        credentials: "omit",
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response;
};

export const deleteMemberShip = async (id) => {
  const accessToken = cookie.get("token");
  const response = await axios
    .delete(
      `http://localhost:5000/api/v1/userapplication/delete/${id}`,
      {
        headers: { Authorization: accessToken },
      },
      {
        credentials: "omit",
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response;
};

// ---------------------------------membership form update-----------------------------------
export const updateMemberShipForm = async (data) => {
  const accessToken = cookie.get("token");
  const result = await axios
    .patch(
      `http://localhost:5000/api/v1/userapplication/updateuserapplicationbyadmin/${data.personalInformation?.phone}`,
      data,
      {
        headers: { Authorization: accessToken },
      }
      // {
      //   headers: { "Content-Type": "multipart/form-data" },
      // }
    )
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

export const deleteMemberShipPhoto = async (data) => {
  const accessToken = cookie.get("token");
  console.log(data);
  const response = await axios
    .delete(
      `http://localhost:5000/api/v1/userapplication/deleteimages/${data.key}/${data.id}`,
      {
        headers: { Authorization: accessToken },
      },
      {
        credentials: "omit",
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response;
};
