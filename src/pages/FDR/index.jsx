import { Outlet } from "react-router-dom";
import MenuBar from "../../shared/MenuBar";
const navRoutes = [
  { route: "/", name: "Home" },
  { route: "/fdr/scheme", name: "FDR Opening Form" },
  { route: "/fdr/history", name: "FDR History" },
  { route: "/fdr/withdraw-amount", name: "Withdraw Amount" },
];

const FDR = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto mt-5">
        <MenuBar routes={navRoutes} />
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default FDR;
