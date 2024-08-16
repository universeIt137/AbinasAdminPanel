/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../images/logo.png";
import Cookies from "universal-cookie";
import { useMutation } from "react-query";
import { logout } from "../../services/auth/auth";
import { useState } from "react";
import Loader from "../Loader";
const cookies = new Cookies();

const Navbar = () => {
  const [loading, setLoading] = useState(false);

  const userPhoneNumber = cookies.get("phone");
  const userName = cookies.get("name");

  const navigate = useNavigate();
  const logouthandler = useMutation(logout);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const success = await logouthandler.mutateAsync({});
      if (success) {
        // logouthandler.reset();
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      logouthandler.reset();
      setLoading(false);
      setTimeout(() => {
        // setError("");
      }, 5000);
    }
  };
  return (
    <div className="bg-[#AECCE8CC]">
      {loading && <Loader forProcess={true} />}
      <div className="navbar w-[95%] mx-auto py-5">
        <div className="flex-1">
          <Link to="/" className="flex items-center">
            <img className="w-[50px] h-[50px]" src={logo} alt="" />
            <h2 className="ml-3 font-semibold">ABINASH FOUNDATION</h2>
          </Link>
        </div>
        <div className="flex-none">
          <div className="flex text-right items-center">
            <div className="flex">
              <Icon icon="ri:home-2-fill" width={30} className="mr-3" />
              <Icon icon="material-symbols:star" width={30} className="mr-3" />
              <Icon icon="ri:notification-3-fill" width={30} className="mr-3" />
              <Icon icon="ph:flag" width={30} className="mr-3" />
              <Icon
                icon="tabler:help-circle-filled"
                width={30}
                className="mr-3"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{userName ?? ""}</p>
              <p className="text-[#0A85F5]">{userPhoneNumber ?? ""}</p>
            </div>
            <label className="btn btn-ghost btn-circle avatar mx-3">
              <div className="w-10 rounded-full">
                <img src="https://i.ibb.co/dK4gwfG/download.jpg" />
              </div>
            </label>
            {userPhoneNumber ? (
              <button
                onClick={() => handleLogout()}
                className="h-[40px] text-xl font-semibold bg-[#BBBBBB] px-2 rounded-md"
              >
                Log Out
              </button>
            ) : (
              <Link to="/login">
                <button className="h-[40px] text-xl font-semibold bg-[#BBBBBB] px-2 rounded-md">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
