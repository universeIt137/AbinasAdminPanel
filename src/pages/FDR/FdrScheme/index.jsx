import { Link } from "react-router-dom";
import doubleScheme from "../../../images/dashboard_image/balance.png";
import singleScheme from "../../../images/dashboard_image/bank.png";

const FdrScheme = () => {
  return (
    <div className="w-[90%] mx-auto mt-5">
      <button className="mt-10 bg-[#55A7F3] text-white px-10 py-3 font-semibold text-3xl rounded-2xl">
        FDR Schemes
      </button>

      <div className="w-[70%]  flex gap-20 gap-y-8 mt-16 mx-16">
        <div className="text-center   cursor-pointer">
          <Link to="/fdr/single-scheme">
            <div className="w-[200px] h-[200px] bg-[#8CDDDD] rounded-3xl customBoxShadow">
              <img src={singleScheme} alt="" />
            </div>
            <h1 className="font-bold mt-2 text-lg">Single Scheme</h1>
          </Link>
        </div>

        <div className="text-center  cursor-pointer">
          <Link to="/fdr/double-scheme">
            <div className="w-[200px] h-[200px] bg-[#00BDBD] rounded-3xl customBoxShadow">
              <img src={doubleScheme} alt="" />
            </div>
            <h1 className="font-bold mt-2 text-lg">Double Scheme</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FdrScheme;
