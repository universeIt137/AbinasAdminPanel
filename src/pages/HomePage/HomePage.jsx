import { Icon } from "@iconify/react";
import homeImage1 from "../../images/dashboard_image/balance.png";
import homeImage2 from "../../images/dashboard_image/bank.png";
import homeImage3 from "../../images/dashboard_image/loan-information.png";
import homeImage4 from "../../images/dashboard_image/web-dashboard.png";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="w-[100%] flex mt-24">
        <div className="w-[30%]">
          <div className="w-[90%] bg-[#BED6ECCC] rounded-md p-2 pt-3">
            <div className="bg-[#F9F9F9] text-center py-5 rounded-md">
              <h1 className="text-3xl font-semibold">My Favorite List</h1>
            </div>
            <div className="h-[300px] mt-3 bg-[#F9F9F9] rounded-md p-1.5 overflow-y-scroll">
              <table className="w-[100%] ">
                <tbody>
                  <tr className="">
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <p className="ml-2 bg-[#4FE955] text-[#F9F9F9] font-semibold text-center rounded-md px-1.5 py-0.5 mr-2">
                        01
                      </p>
                    </td>
                    <td className="w-[80%] text-[#333333CC] hover:text-[#4EA9FD] font-bold cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      DPS Opening Form
                    </td>
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <Icon
                        icon="charm:cross"
                        className="bg-[#FF2828] rounded-full text-white"
                      />
                    </td>
                  </tr>
                  <tr className="">
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <p className="ml-2 bg-[#4FE955] text-[#F9F9F9] font-semibold text-center rounded-md px-1.5 py-0.5 mr-2">
                        02
                      </p>
                    </td>
                    <td className="w-[80%] text-[#333333CC] hover:text-[#4EA9FD] font-bold cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      DPS History
                    </td>
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <Icon
                        icon="charm:cross"
                        className="bg-[#FF2828] rounded-full text-white"
                      />
                    </td>
                  </tr>
                  <tr className="">
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <p className="ml-2 bg-[#4FE955] text-[#F9F9F9] font-semibold text-center rounded-md px-1.5 py-0.5 mr-2">
                        03
                      </p>
                    </td>
                    <td className="w-[80%] text-[#333333CC] hover:text-[#4EA9FD] font-bold cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      DPS Collection
                    </td>
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <Icon
                        icon="charm:cross"
                        className="bg-[#FF2828] rounded-full text-white"
                      />
                    </td>
                  </tr>
                  <tr className="">
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <p className="ml-2 bg-[#4FE955] text-[#F9F9F9] font-semibold text-center rounded-md px-1.5 py-0.5 mr-2">
                        04
                      </p>
                    </td>
                    <td className="w-[80%] text-[#333333CC] hover:text-[#4EA9FD] font-bold cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      DPS Collection History
                    </td>
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <Icon
                        icon="charm:cross"
                        className="bg-[#FF2828] rounded-full text-white"
                      />
                    </td>
                  </tr>
                  <tr className="">
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <p className="ml-2 bg-[#4FE955] text-[#F9F9F9] font-semibold text-center rounded-md px-1.5 py-0.5 mr-2">
                        05
                      </p>
                    </td>
                    <td className="w-[80%] text-[#333333CC] hover:text-[#4EA9FD] font-bold cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      Remaining payment
                    </td>
                    <td className="w-[10%] cursor-pointer border-b-2 border-b-[#00000066] py-2">
                      <Icon
                        icon="charm:cross"
                        className="bg-[#FF2828] rounded-full text-white"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-[70%] grid grid-cols-4 gap-y-8">
          <div className="text-center mx-auto cursor-pointer">
            <Link to="/dps/opening-form">
              <div className="w-[150px] h-[150px] bg-[#00BDBD] rounded-3xl customBoxShadow">
                <img src={homeImage2} alt="" />
              </div>
              <h1 className="font-bold mt-2 text-lg">DPS Information</h1>
            </Link>
          </div>
          <div className="text-center mx-auto cursor-pointer">
            <Link to="/fdr/scheme">
              <div className="w-[150px] h-[150px] bg-[#8CDDDD] rounded-3xl customBoxShadow">
                <img src={homeImage1} alt="" />
              </div>
              <h1 className="font-bold mt-2 text-lg">FDR Information</h1>
            </Link>
          </div>
          <div className="text-center mx-auto cursor-pointer">
            <Link to="/">
              <div className="w-[150px] h-[150px] bg-[#86CAFB] rounded-3xl customBoxShadow">
                <img className="w-[75%] mx-auto pt-5" src={homeImage3} alt="" />
              </div>
              <h1 className="font-bold mt-2 text-lg">Loan Information</h1>
            </Link>
          </div>
          <div className="text-center mx-auto cursor-pointer">
            <Link to="/">
              <div className="w-[150px] h-[150px] bg-[#F8BB9A] rounded-3xl pt-7 customBoxShadow">
                <Icon icon="ep:document-copy" width="90" className="mx-auto" />
              </div>
              <h1 className="font-bold mt-2 text-lg">Membership ApI</h1>
            </Link>
          </div>
          <div className="text-center mx-auto cursor-pointer">
            <Link to="/">
              <div className="w-[150px] h-[150px] bg-[#86CAFB] rounded-3xl pt-7 customBoxShadow">
                <Icon
                  icon="mingcute:user-x-fill"
                  width="90"
                  className="mx-auto"
                />
              </div>
              <h1 className="font-bold mt-2 text-lg">Unapproved User</h1>
            </Link>
          </div>
          <div className="text-center mx-auto cursor-pointer">
            <Link to="/">
              <div className="w-[150px] h-[150px] bg-[#F8BB9A] rounded-3xl pt-7 mx-auto customBoxShadow">
                <Icon icon="ph:users-fill" width="90" className="mx-auto" />
              </div>
              <h1 className="font-bold mt-2 text-lg">Unapproved Member</h1>
            </Link>
          </div>
          <div className="text-center mx-auto cursor-pointer">
            <Link to="/web">
              <div className="w-[150px] h-[150px] bg-[#59FAFA] rounded-3xl customBoxShadow">
                <img className="w-[75%] mx-auto pt-5" src={homeImage4} alt="" />
              </div>
              <h1 className="font-bold mt-2 text-lg">Web Dashboard</h1>
            </Link>
          </div>

          <div className="text-center mx-auto cursor-pointer">
            <Link to="/">
              <div className="w-[150px] h-[150px] bg-[#8CDDDD] rounded-3xl pt-7 customBoxShadow">
                <Icon
                  icon="teenyicons:user-solid"
                  width="90"
                  className="mx-auto"
                />
              </div>
              <h1 className="font-bold mt-2 text-lg">Profile</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
