import { toast } from "react-toastify";
import axios from "../../utils/axiosInterceptor";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export const getapprovedDps = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get("http://localhost:5000/api/v1/dpsform?approveStatus=approved", {
      headers: { Authorization: accessToken },
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response?.data;
};

export const getunapprovedDps = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get("http://localhost:5000/api/v1/dpsform?approveStatus=pending", {
      headers: { Authorization: accessToken },
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response?.data;
};

export const createDps = async (data) => {
  const accessToken = cookie.get("token");
  // console.log(data);
  const result = await axios
    .post("http://localhost:5000/api/v1/dpsform", data, {
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

export const updateDps = async (data) => {
  const accessToken = cookie.get("token");
  const id = data?.id;
  delete data.id;
  const result = await axios
    .patch(`http://localhost:5000/api/v1/dpsform/${id}`, data, {
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

export const getAllDps = async () => {
  const accessToken = cookie.get("token");
  const response = await axios
    .get("http://localhost:5000/api/v1/dpsform", {
      headers: { Authorization: accessToken },
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return response?.data;
};

export const approveDpsForm = async (id) => {
  const accessToken = cookie.get("token");
  console.log(id);
  const response = await axios
    .patch(`http://localhost:5000/api/v1/dpsform/approve/${id}`, {
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

export const paymentDps = async (data) => {
  const accessToken = cookie.get("token");
  const name = cookie.get("name");
  const phone = cookie.get("phone");
  data.adminName = name;
  data.adminPhone = phone;
  const id = data?.id;
  delete data.id;
  console.log(data);
  const response = await axios
    .patch(`http://localhost:5000/api/v1/dpsform/payInstallment/${id}`, data, {
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

export const dpsStatusChange = async (data) => {
  const accessToken = cookie.get("token");
  const id = data?.id;
  delete data.id;
  console.log("object");
  console.log(data);
  const response = await axios
    .patch(`http://localhost:5000/api/v1/dpsform/closeDps/${id}`, data, {
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

export const dpsReturnAmount = async (data) => {
  const accessToken = cookie.get("token");
  const name = cookie.get("name");
  const phone = cookie.get("phone");
  data.adminName = name;
  data.adminPhone = phone;

  const id = data?.id;
  delete data.id;
  const response = await axios
    .patch(`http://localhost:5000/api/v1/dpsform/returnAmount/${id}`, data, {
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

export const currentDate = () => {
  const d = new Date();
  const ts = new Date(d);
  const presentDate = ts.toJSON().split("T")[0];

  return presentDate;
};

export const dpsTotalLateFee = (dpsInfo) => {
  const lateFee = dpsInfo?.lateFee;
  const paymentHistory = dpsInfo?.paymentHistory;

  const presentDate = currentDate();
  const totalLateFee = paymentHistory.reduce((sum, paymentDetails) => {
    if (
      (paymentDetails.paymentStatus === "unpaid" &&
        paymentDetails.lastDate < presentDate) ||
      (paymentDetails.paymentStatus === "paid" &&
        paymentDetails.lastDate < paymentDetails.payDate)
    ) {
      return sum + lateFee;
    } else {
      return sum;
    }
  }, 0);

  return totalLateFee;
};
