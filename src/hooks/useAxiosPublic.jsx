import axios from "axios";
const backendURL = 'https://backendserver.abinashfoundation.com/api/v1'

const axiosPublic = axios.create({
  baseURL: backendURL
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic; 