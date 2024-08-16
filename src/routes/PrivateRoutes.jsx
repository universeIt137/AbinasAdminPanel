/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/routeGurd";

const PrivateRoute = ({ children }) => {
  const authenticated = isAuthenticated();

  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
