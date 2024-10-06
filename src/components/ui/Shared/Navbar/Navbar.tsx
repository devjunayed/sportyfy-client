import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import {  NavLink } from "react-router-dom";
import { viewersPath } from "../../../../routes/viewers.routes";
import Logo from "../Logo/Logo";
import NavbarButton from "./NavbarButton";

const Navbar = () => {
  const isLogin = false;

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="navbar shadow bg-[#1B1F3B] text-white px-10">
        <div className="navbar-start">
          {/* smaller device menu */}
          <div
            className={`${menu && "z-[30]"}  absolute top-2 left-0 lg:hidden`}
          >
            <div role="button" className="btn btn-ghost " onClick={handleMenu}>
              {!menu ? <MenuOutlined /> : <CloseOutlined />}
            </div>
            <ul
              onClick={handleMenu}
              className={`${
                menu
                  ? "translate-x-0 transition-transform duration-500 ease-in-out"
                  : "-translate-x-[500rem] transition-none"
              } transform bg-[#1B1F3B]  menu menu-sm dropdown-content rounded z-[1] mt-3 w-52 p-4  shadow-gray-400 shadow`}
            >
              {viewersPath.map((link) => (
                <li key={link?.path} className="hover:cursor-pointer">
                  <NavLink className={"cursor-pointer"} to={link?.path}>
                    {link?.name}
                  </NavLink>
                </li>
              ))}

              <NavbarButton className="mt-4"/>
            </ul>
          </div>
          {/* Logo here */}
          <div className="lg:block hidden">
            <Logo />
          </div>
        </div>
        <div className="navbar-center">
          <div className="text-xl lg:hidden">
            <Logo />
          </div>
          {/* Larger device menu */}
          <div className=" hidden w-full lg:flex">
            <ul className="flex flex-wrap items-center gap-4 bg-none menu-horizontal px-1">
              {viewersPath.map((link) => (
                <li key={link?.path} className=" hover:cursor-pointer">
                  <NavLink
                    className="hover:cursor-pointer bg-none "
                    to={link?.path}
                  >
                    {link?.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          {isLogin ? (
            <div className="avatar">
              <div className=" size-10  rounded-full ring  ring-white">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          ) : (
            <div className="lg:flex hidden">
              <NavbarButton />
            </div>
            
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
