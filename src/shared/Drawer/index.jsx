/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavItem = ({ dest, isActive, title }) => {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-md  hover:cursor-pointer hover:text-white"
      onClick={() => navigate(dest)}
    >
      <h1
        className={`text-md font-semibold ml-3 mb-2 hover:bg-secondary px-3 py-1 rounded-md block focus:bg-secondary active:bg-secondary ${
          isActive && "active-bg"
        }`}
      >
        {title}
      </h1>
    </div>
  );
};

const SideBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const path = useLocation();

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div>
      <div>
        <div className="mt-4 mb-2">
          <h1 className="text-2xl font-semibold text-center">Web Dashboard</h1>
          {/* <Icon icon="fluent-emoji-high-contrast:cross-mark" /> */}
        </div>
        {/* divider */}
        <div className="border-b-2 border-b-secondary"></div>

        <div className="mt-5 px-4">
          {/* membership */}
          <div>
            <div
              className="flex justify-between items-center hover:bg-secondary rounded-md px-2 hover:cursor-pointer hover:text-white my-3"
              onClick={() => handleDropdownClick(1)}
            >
              <div className="flex items-center ">
                <Icon icon="mdi:wallet-membership" width={25} />
                <h1 className="text-xl font-semibold ml-3 mb-2">Membership</h1>
              </div>
              <Icon icon="ep:arrow-down-bold" />
            </div>
            {activeDropdown === 1 && (
              <div className="ml-6">
                <NavItem
                  dest={"/web/membership/pending"}
                  isActive={
                    path.pathname === "/web/membership/pending" ? true : false
                  }
                  title={"Pending Membership"}
                />
                <NavItem
                  dest={"/web/membership/approved"}
                  isActive={
                    path.pathname === "/web/membership/approved" ? true : false
                  }
                  title={"Approved Membership"}
                />
                <NavItem
                  dest={"/web/membership/rejected"}
                  isActive={
                    path.pathname === "/web/membership/rejected" ? true : false
                  }
                  title={"Rejected Membership"}
                />
                <NavItem
                  dest={"/web/membership/create"}
                  isActive={
                    path.pathname === "/web/membership/create" ? true : false
                  }
                  title={"Create Membership"}
                />
              </div>
            )}
          </div>

          {/* service */}
          <div>
            <div
              className="flex justify-between items-center hover:bg-secondary rounded-md px-2 hover:cursor-pointer hover:text-white my-3"
              onClick={() => handleDropdownClick(5)}
            >
              <div className="flex items-center ">
                <Icon icon="mdi:account-service-outline" width={25} />
                <h1 className="text-xl font-semibold ml-3 mb-2">Service</h1>
              </div>
              <Icon icon="ep:arrow-down-bold" />
            </div>
            {activeDropdown === 5 && (
              <div className="ml-6">
                <NavItem
                  dest={"/web/service/add"}
                  isActive={path.pathname === "/web/service/add" ? true : false}
                  title={"Add Service"}
                />
                <NavItem
                  dest={"/web/service/applied"}
                  isActive={
                    path.pathname === "/web/service/applied" ? true : false
                  }
                  title={"Pending Services"}
                />

                <NavItem
                  dest={"/web/service"}
                  isActive={path.pathname === "/web/service" ? true : false}
                  title={"Manage Services"}
                />
              </div>
            )}
          </div>
          {/* Our Concern */}
          <div>
            <div
              className="flex justify-between items-center hover:bg-secondary rounded-md px-2 hover:cursor-pointer hover:text-white my-3"
              onClick={() => handleDropdownClick(6)}
            >
              <div className="flex items-center ">
                <Icon icon="mdi:account-service-outline" width={25} />
                <h1 className="text-xl font-semibold ml-3 mb-2">Our Concern</h1>
              </div>
              <Icon icon="ep:arrow-down-bold" />
            </div>
            {activeDropdown === 6 && (
              <div className="ml-6">
                <NavItem
                  dest={"/web/concern/add"}
                  isActive={path.pathname === "/web/concern/add" ? true : false}
                  title={"Add Our Concern"}
                />

                <NavItem
                  dest={"/web/concern"}
                  isActive={path.pathname === "/web/concern" ? true : false}
                  title={"Manage Our Concern"}
                />
              </div>
            )}
          </div>
          {/* Media */}
          <div>
            <div
              className="flex justify-between items-center hover:bg-secondary rounded-md px-2 hover:cursor-pointer hover:text-white my-3"
              onClick={() => handleDropdownClick(7)}
            >
              <div className="flex items-center ">
                <Icon icon="mdi:perm-media" width={25} />
                <h1 className="text-xl font-semibold ml-3 mb-2">Media</h1>
              </div>
              <Icon icon="ep:arrow-down-bold" />
            </div>
            {activeDropdown === 7 && (
              <div className="ml-6">
                <NavItem
                  dest={"/web/media/add"}
                  isActive={path.pathname === "/web/media/add" ? true : false}
                  title={"Add Media"}
                />

                <NavItem
                  dest={"/web/media"}
                  isActive={path.pathname === "/web/media" ? true : false}
                  title={"Manage Media"}
                />
              </div>
            )}
          </div>
          {/* News */}
          <div>
            <div
              className="flex justify-between items-center hover:bg-secondary rounded-md px-2 hover:cursor-pointer hover:text-white my-3"
              onClick={() => handleDropdownClick(8)}
            >
              <div className="flex items-center ">
                <Icon icon="iconamoon:news-bold" width={25} />
                <h1 className="text-xl font-semibold ml-3 mb-2">News</h1>
              </div>
              <Icon icon="ep:arrow-down-bold" />
            </div>
            {activeDropdown === 8 && (
              <div className="ml-6">
                <NavItem
                  dest={"/web/news/add"}
                  isActive={path.pathname === "/web/news/add" ? true : false}
                  title={"Add News"}
                />

                <NavItem
                  dest={"/web/news"}
                  isActive={path.pathname === "/web/news" ? true : false}
                  title={"Manage News"}
                />
              </div>
            )}
          </div>
          {/* About Us */}
          <div>
            <div
              className="flex justify-between items-center hover:bg-secondary rounded-md px-2 hover:cursor-pointer hover:text-white my-3"
              onClick={() => handleDropdownClick(9)}
            >
              <div className="flex items-center ">
                <Icon icon="mdi:about" width={25} />
                <h1 className="text-xl font-semibold ml-3 mb-2">About Us</h1>
              </div>
              <Icon icon="ep:arrow-down-bold" />
            </div>
            {activeDropdown === 9 && (
              <div className="ml-6">
                <NavItem
                  dest={"/web/about-us/add"}
                  isActive={
                    path.pathname === "/web/about-us/add" ? true : false
                  }
                  title={"Add About Us"}
                />

                <NavItem
                  dest={"/web/about-us"}
                  isActive={path.pathname === "/web/about-us" ? true : false}
                  title={"Manage About Us"}
                />
              </div>
            )}
          </div>
          {/* Get In Touch */}
          <div>
            <div
              className="flex justify-between items-center hover:bg-secondary rounded-md px-2 hover:cursor-pointer hover:text-white my-3"
              onClick={() => handleDropdownClick(10)}
            >
              <div className="flex items-center ">
                <Icon icon="carbon:touch-1" width={25} />
                <h1 className="text-xl font-semibold ml-3 mb-2">
                  Get In Touch
                </h1>
              </div>
              <Icon icon="ep:arrow-down-bold" />
            </div>
            {activeDropdown === 10 && (
              <div className="ml-6">
                <NavItem
                  dest={"/web/get-in-touch/job-circular"}
                  isActive={
                    path.pathname === "/web/get-in-touch/job-circular"
                      ? true
                      : false
                  }
                  title={"Job Circular"}
                />

                <NavItem
                  dest={"/web/get-in-touch/notice"}
                  isActive={
                    path.pathname === "/web/get-in-touch/notice" ? true : false
                  }
                  title={"Notice"}
                />
                <NavItem
                  dest={"/web/get-in-touch/contact-us"}
                  isActive={
                    path.pathname === "/web/get-in-touch/contact-us"
                      ? true
                      : false
                  }
                  title={"Contact"}
                />
                <NavItem
                  dest={"/web/get-in-touch/csr"}
                  isActive={
                    path.pathname === "/web/get-in-touch/csr" ? true : false
                  }
                  title={"Csr"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
