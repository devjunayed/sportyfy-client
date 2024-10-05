import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { viewersPath } from "../../../../routes/viewers.routes";

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

              <Button className="text-white mt-4 flex items-center justify-center">
                <Link to="/login" className="mx-auto">
                  Login
                </Link>
                /
                <Link to="/register" className="mx-auto">
                  Register
                </Link>
              </Button>
            </ul>
          </div>
          <a className="text-xl lg:block hidden" href="/">
            🤸‍♀️ Sportyfy
          </a>
        </div>
        <div className="navbar-center">
          <a className="text-xl lg:hidden" href="/">
            🤸‍♀️ Sportyfy
          </a>
          {/* Larger device menu */}
          <div className=" hidden w-full lg:flex">
            <ul className="flex flex-wrap  gap-4 bg-none menu-horizontal px-1">
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
            <Button className="text-white ">
                <Link to="/login" className="mx-auto">
                  Login
                </Link>
                /
                <Link to="/register" className="mx-auto">
                  Register
                </Link>
              </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
