import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { useContext, useEffect, useRef, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { UserContext } from "../../../assets/context/userContext";

const AdminLayout = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toggleSidebar } = useContext(UserContext);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsShowDropdown(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsShowDropdown(false);
    }
  };

  useEffect(() => {
    if (isShowDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShowDropdown]);

  return (
    <div className="flex flex-row gap-2 bg-secondary min-h-screen w-full p-2.5">
      <SideBar />
      <main
        id="mainContainer"
        className="w-full p-2 rounded-lg flex flex-col overflow-auto h-[calc(100vh-1.3rem)]"
      >
        <div className="relative w-full bg-white rounded shadow p-2.5 mb-2 flex items-center justify-end">
          <IoMdMenu
            onClick={toggleSidebar}
            className="mr-auto cursor-pointer text-primary hover:text-slate-600 transition-all ease-in"
            size={30}
          />
          <div
            onClick={() => setIsShowDropdown(!isShowDropdown)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <div className="profile-image w-8 h-8 shadow rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://png.pngtree.com/thumb_back/fh260/background/20230613/pngtree-an-indian-male-in-a-green-shirt-with-short-hair-image_2961300.jpg"
                alt="User profile picture"
              />
            </div>
            <span className="text-slate-800 font-medium text-sm">
              Marvin Lim
            </span>
            {isShowDropdown ? (
              <MdArrowDropUp size={22} />
            ) : (
              <MdArrowDropDown size={22} />
            )}
          </div>

          {/* User Dropdown */}
          {isShowDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-12 right-0 w-60 bg-white shadow-lg border border-slate-100 p-2 rounded z-10"
            >
              <ul className="flex flex-col justify-around space-y-1 text-base h-full">
                <li
                  onClick={() => {
                    console.log("NAVIGATE TO PROFILE PAGE");
                  }}
                  className="flex items-center rounded gap-4 p-1.5 hover:bg-secondary transition-all ease-in duration-200 cursor-pointer"
                >
                  <CgProfile />
                  Profile
                </li>
                <li className="flex items-center rounded gap-4 p-1.5 hover:bg-secondary transition-all ease-in duration-200 cursor-pointer">
                  <IoSettingsOutline />
                  Settings
                </li>
                <li
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent closing the dropdown
                    console.log("LOGOUT");
                  }}
                  className="flex items-center rounded gap-4 p-1.5 hover:bg-secondary transition-all ease-in duration-200 cursor-pointer"
                >
                  <SlLogout />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
