import axios from "axios";
// const backendURL = 'https://backendserver.abinashfoundation.com/api/v1';
// const backendURL = 'http://localhost:5000/api/v1';
// const backendURL = 'https://abinas-server.vercel.app/api/v1';

// image related backendURL Server.abinas
const backendURL = 'https://server.abinashfoundation.com/api/v1';

const axiosPublic = axios.create({
  baseURL: backendURL
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic; 