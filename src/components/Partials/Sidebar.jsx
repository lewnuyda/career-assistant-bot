import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { List, Typography } from "@material-tailwind/react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () =>  {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen && isOpen) {
      toggleSidebar();
    }
  }, [isSmallScreen]);

  const navItemClass = ({ isActive }) =>
    `rounded-md px-4 py-2 flex items-center gap-3 transition-colors ${
      isActive
        ? "bg-black text-white font-semibold"
        : "text-blue-gray-500 hover:bg-gray-100"
    }`;

  return (
    <div
      className={`h-full fixed top-0 left-0 w-64 bg-white shadow-lg z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform ease-in-out duration-300`}
    >
      <div className="flex items-center gap-5 my-5 ml-3">
        <img
          className="h-20 w-20 object-cover object-center rounded-full"
          src="https://picsum.photos/100"
          alt="Sample"
        />
        <div>
          <Typography variant="h6" color="blue-gray">
            ABC
          </Typography>
          <Typography variant="small" color="blue-gray">
            Management System
          </Typography>
        </div>
      </div>

      <List>
        <NavLink to="/dashboard" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25m13.5-13.5v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3 .5 1.5h-9.5l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
            />
          </svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/profile" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
          </svg>
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M11.983 2.25a1.5 1.5 0 0 1 1.482 1.318l.127 1.057a7.568 7.568 0 0 1 1.472.596l.977-.564a1.5 1.5 0 0 1 2.06.564l.75 1.299a1.5 1.5 0 0 1-.421 2.03l-.88.638a7.543 7.543 0 0 1 0 1.193l.88.638a1.5 1.5 0 0 1 .421 2.03l-.75 1.299a1.5 1.5 0 0 1-2.06.564l-.977-.564a7.566 7.566 0 0 1-1.472.596l-.127 1.057a1.5 1.5 0 0 1-1.482 1.318h-1.5a1.5 1.5 0 0 1-1.482-1.318l-.127-1.057a7.57 7.57 0 0 1-1.472-.596l-.977.564a1.5 1.5 0 0 1-2.06-.564l-.75-1.299a1.5 1.5 0 0 1 .421-2.03l.88-.638a7.543 7.543 0 0 1 0-1.193l-.88-.638a1.5 1.5 0 0 1-.421-2.03l.75-1.299a1.5 1.5 0 0 1 2.06-.564l.977.564a7.568 7.568 0 0 1 1.472-.596l.127-1.057a1.5 1.5 0 0 1 1.482-1.318h1.5Zm-.733 8.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Settings</span>
        </NavLink>
      </List>
    </div>
  );
};

export default Sidebar;
