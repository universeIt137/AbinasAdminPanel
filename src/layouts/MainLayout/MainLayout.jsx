import { Outlet } from "react-router-dom";
import Navbar from "../../shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />

      <Outlet />
      {/* <h1>footer</h1> */}
    </div>
  );
};

export default MainLayout;
