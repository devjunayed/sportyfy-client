import {
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {  NavLink } from "react-router-dom";

const Navbar = () => {

  const links = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/products",
      text: "Products",
    },
    {
      path: "/dashboard",
      text: "Dashboard",
    },
  ];

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    {/* smaller device menu */}
    <div className={`${menu && 'z-[30]'} absolute top-2 left-0 lg:hidden`}>
            <div
              role="button"
              className="btn btn-ghost "
              onClick={handleMenu}
            >
              {!menu ? <MenuOutlined /> : <CloseOutlined />}
            </div>
            <ul
            onClick={handleMenu} 
              className={`${
                menu ? "translate-x-0 transition-transform duration-500 ease-in-out" : "-translate-x-[500rem] transition-none"
              } transform  text-black menu menu-sm dropdown-content rounded z-[1] mt-3 w-52 p-2 shadow`}
            >
              {links.map((link) => (
                <li key={link?.path} className="hover:cursor-pointer">
                  <NavLink className={"cursor-pointer"} to={link?.path}>
                    {link?.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
  </div>
  <div className="navbar-center">
    <a className="text-xl" href="/">🤸‍♀️ Sportyfy</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div>
      <div className="relative navbar rounded px-6 shadow uppercase text-black">
        <div className=" w-full">
      

          {/* Larger device menu */}
          <div className="navbar-start hidden lg:flex">
            <ul className="flex flex-wrap  gap-4 bg-none menu-horizontal px-1">
              {links.map((link) => (
                <li  key={link?.path} className=" hover:cursor-pointer">
                  <NavLink
                    className="hover:cursor-pointer bg-none text-black"
                    to={link?.path}
                  >
                    {link?.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="">
         
        </div>
      </div>
    </>
  );
};

export default Navbar;