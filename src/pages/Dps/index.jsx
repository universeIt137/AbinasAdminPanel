import { Outlet } from "react-router-dom";
import MenuBar from "../../shared/MenuBar";

const navRoutes = [
  { route: "/", name: "Home" },
  { route: "/dps/opening-form", name: "DPS Opening Form" },
  { route: "/dps/history", name: "DPS History" },
  { route: "/dps/collection", name: "DPS Collection" },
  { route: "/dps/withdraw", name: "Withdraw Amount" },
];

const Dps = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto mt-5">
        <MenuBar routes={navRoutes} />
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Dps;
