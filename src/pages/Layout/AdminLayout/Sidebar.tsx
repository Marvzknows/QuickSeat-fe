import { useContext, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { RiMovie2Fill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdEventSeat, MdOutlineSportsKabaddi } from "react-icons/md";
import { UserContext } from "../../../assets/context/userContext";

const SideBar = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { isCollapse, toggleSidebar } = useContext(UserContext);
  const location = useLocation();

  const NavLinks = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: <RxDashboard />,
      subMenu: null,
    },
    {
      name: "Movies",
      link: "",
      icon: <RiMovie2Fill />,
      subMenu: [
        { name: "Upcoming show", link: "/admin/upcoming" },
        { name: "Now Showing", link: "/admin/nowshowing" },
        { name: "Manage Seats", link: "/admin/seats" },
      ],
    },
    {
      name: "Sport",
      link: "",
      icon: <MdOutlineSportsKabaddi />,
      subMenu: [
        { name: "Basketball", link: "/admin/basketball" },
        { name: "Volleyball", link: "/admin/volleyball" },
        { name: "Boxing", link: "/admin/boxing" },
      ],
    },
  ];

  const handleToggle = (name: string) => {
    setOpenSubMenu((prev) => (prev === name ? null : name));
  };

  const isSubMenuActive = (
    subMenu: { name: string; link: string }[] | null,
  ) => {
    if (!subMenu) return false;
    return subMenu.some((item) => location.pathname === item.link);
  };

  return (
    <aside
      id="sideBar"
      className={`rounded py-2.5 h-[calc(100vh-28px)] my-auto ${
        isCollapse ? "w-72 px-4" : "w-[60px] px-0"
      } bg-white transition-all ease-out duration-300`}
    >
      <div className="text-xl font-roboto font-semibold text-center cursor-pointer">
        {isCollapse ? (
          "QuickSeat"
        ) : (
          <MdEventSeat
            className="mx-auto hover:text-slate-700 transition-all ease-in-out duration-200"
            size={30}
          />
        )}
      </div>

      <ul className="mt-5">
        {NavLinks.map((navItem, index) => (
          <li onClick={!isCollapse ? toggleSidebar : undefined} key={index}>
            {!navItem.subMenu ? (
              <NavLink
                to={navItem.link}
                className={({ isActive }) =>
                  `flex items-center ${!isCollapse && "justify-center"} gap-3 px-2.5 py-1.5 rounded text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-slate-200 hover:text-primary"
                  }`
                }
              >
                {navItem.icon}
                {isCollapse && <span>{navItem.name}</span>}
              </NavLink>
            ) : (
              <div
                className={`flex items-center ${!isCollapse && "justify-center"} gap-3 px-2.5 py-1.5 rounded text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSubMenuActive(navItem.subMenu)
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-slate-200 hover:text-primary"
                }`}
                onClick={() => handleToggle(navItem.name)}
              >
                {navItem.icon}
                {isCollapse && <span>{navItem.name}</span>}
                {navItem.subMenu && isCollapse && (
                  <span className="ml-auto">
                    {openSubMenu === navItem.name ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </span>
                )}
              </div>
            )}

            {navItem.subMenu && openSubMenu === navItem.name && isCollapse && (
              <ul className="ml-5 mt-1 px-2 bg-secondary rounded-sm border border-slate-200">
                {navItem.subMenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink
                      to={subItem.link}
                      className={({ isActive }) =>
                        `text-xs font-bold transition-all duration-200 ${
                          isActive
                            ? "font-bold underline"
                            : "text-slate-600 hover:text-primary"
                        }`
                      }
                    >
                      {subItem.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
