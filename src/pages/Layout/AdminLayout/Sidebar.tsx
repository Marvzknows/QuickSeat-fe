import { useState } from 'react';
import { RxDashboard } from 'react-icons/rx';
import { RiMovie2Fill } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const SideBar = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const location = useLocation();

    const NavLinks = [
        {
            name: 'Dashboard',
            link: '/admin/dashboard',
            icon: <RxDashboard />,
            subMenu: null,
        },
        {
            name: 'Movies',
            link: '',
            icon: <RiMovie2Fill />,
            subMenu: [
                { name: 'Upcoming Showing', link: '/admin/upcoming' },
                { name: 'Now Showing', link: '/admin/nowshowing' },
                { name: 'Manage Seats', link: '/admin/seats' },
            ],
        },
    ];

  const handleToggle = (name: string) => {
    setOpenSubMenu((prev) => (prev === name ? null : name));
  };

  const isSubMenuActive = (subMenu: { name: string; link: string }[] | null) => {
    if (!subMenu) return false;
    return subMenu.some((item) => location.pathname === item.link);
  };

  return (
    <aside id="sideBar" className="rounded py-2.5 px-4 h-[calc(100vh-28px)] my-auto w-72 bg-white">
      <div className="text-xl font-roboto font-semibold text-center cursor-pointer">
        QuickSeat
      </div>

      <ul className="mt-5">
        {NavLinks.map((navItem, index) => (
          <li key={index}>
            {!navItem.subMenu ? (
              <NavLink
                to={navItem.link}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2.5 py-1.5 rounded text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-slate-200 hover:text-primary'
                  }`
                }
              >
                {navItem.icon}
                {navItem.name}
              </NavLink>
            ) : (
              <div
                className={`flex items-center gap-3 px-2.5 py-1.5 rounded text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSubMenuActive(navItem.subMenu) ? 'bg-black text-white' : 'text-gray-700 hover:bg-slate-200 hover:text-primary'
                }`}
                onClick={() => handleToggle(navItem.name)}
              >
                {navItem.icon}
                {navItem.name}
                {navItem.subMenu && openSubMenu === navItem.name ? <FaAngleUp className='ml-auto' /> :<FaAngleDown className='ml-auto' />}
              </div>
            )}

            {navItem.subMenu && openSubMenu === navItem.name && (
              <ul className="ml-5 mt-1 px-2 rounded-sm">
                {navItem.subMenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink
                      to={subItem.link}
                      className={({ isActive }) =>
                        `text-xs font-semibold transition-all duration-200 ${
                          isActive ? 'font-bold underline' : 'text-slate-600 hover:text-primary'
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
