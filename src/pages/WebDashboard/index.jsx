import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../../shared/Drawer";
import Navbar from "../../shared/Navbar";
const WebDashboard = () => {
  const [dashboardHeight, setDashboardHeight] = useState(0);
  useEffect(() => {
    const updateDashboardHeight = () => {
      const navbarHeight = 90;
      const windowHeight = window.innerHeight;
      const newDashboardHeight = windowHeight - navbarHeight;
      setDashboardHeight(newDashboardHeight);
    };

    updateDashboardHeight();

    window.addEventListener("resize", updateDashboardHeight);
    return () => {
      window.removeEventListener("resize", updateDashboardHeight);
    };
  }, []);
  return (
    <div className="overflow-y-hidden">
      <Navbar />
      <div className="w-[100%] flex">
        <div
          className="w-[20%] bg-primary overflow-y-scroll"
          style={{ height: `${dashboardHeight}px` }}
        >
          <Drawer />
        </div>
        <div
          className="w-[80%] px-5 py-5 overflow-y-scroll"
          style={{ height: `${dashboardHeight}px` }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WebDashboard;
