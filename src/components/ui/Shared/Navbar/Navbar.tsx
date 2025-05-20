import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { viewersPath } from "../../../../routes/viewers.routes";
import Logo from "../Logo/Logo";
import NavbarButton from "./NavbarButton";
import { useAppSelector } from "../../../../redux/hooks";
import { currentUser } from "../../../../redux/features/authSlice";
import { TUser } from "../../../../types/shared.type";
import { useGetUserQuery } from "../../../../redux/api/auth/authApi";
import { capitalize } from "../../../../utils/capitalize";

const Navbar = () => {
  const pathname = useLocation().pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const user = useAppSelector(currentUser);
  const { data: userData } = useGetUserQuery(
    user ? `${(user as TUser).email}` : ""
  );

  const handleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        className={`fixed top-0  left-0 text-white w-full  z-50 transition-all duration-300 ${
          isScrolled &&
          pathname === "/" &&
          "bg-[#1B1F3B] shadow-md text-black backdrop-blur-lg"
        }  ${pathname !== "/" && "bg-[#1B1F3B] "}`}
      >
        <div className="navbar m-0 p-0  max-w-7xl mx-auto  text-white ">
          <div className="navbar-start">
            {/* smaller device menu */}
            <div
              className={`${menu && "z-[30]"}  absolute top-2 left-0 lg:hidden`}
            >
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
                  menu
                    ? "translate-x-0 transition-transform duration-500 ease-in-out"
                    : "-translate-x-[500rem] transition-none"
                } transform bg-[#1B1F3B]  menu menu-sm dropdown-content rounded z-[1] mt-3 w-52 p-4  shadow-gray-400 shadow`}
              >
                {viewersPath.map(
                  (link) =>
                    !link.name && (
                      <li key={link?.path} className="hover:cursor-pointer">
                        <NavLink className={"cursor-pointer"} to={link?.path}>
                          {link?.name}
                        </NavLink>
                      </li>
                    )
                )}
                {userData && (
                  <li
                    key={userData?.data?.role as string}
                    className="hover:cursor-pointer"
                  >
                    <NavLink
                      replace={true}
                      className={"cursor-pointer"}
                      to={`/${userData?.data?.role as string}/dashboard`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}

                <NavbarButton className="mt-4" />
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
                {viewersPath.map(
                  (link) =>
                    link.name && (
                      <li key={link?.path} className=" hover:cursor-pointer">
                        <NavLink
                          className="hover:cursor-pointer bg-none "
                          to={link?.path}
                        >
                          {link?.name}
                        </NavLink>
                      </li>
                    )
                )}
                {userData && (
                  <li
                    key={userData.role as string}
                    className="hover:cursor-pointer"
                  >
                    <NavLink
                      className={"cursor-pointer"}
                      replace={true}
                      to={`/${userData?.data?.role as string}/dashboard`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="navbar-end">
            {userData ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <div className="avatar border rounded-full avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full flex items-center justify-center">
                      <span className="flex items-center justify-center h-full">
                        {capitalize(userData?.data?.name[0])}
                        {capitalize(userData?.data?.name[1])}
                      </span>
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu mt-4 bg-[#1B1F3B] rounded-box z-1 w-72 px-4 shadow-sm"
                >
                  <li className="mt-2">
                    <div>
                      <div className="flex flex-col  ">
                        <span className="text-lg">{userData?.data?.name}</span>
                        <span>{userData?.data?.email}</span>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
                  </li>
                  <li>
                    <NavbarButton />
                  </li>
                </ul>
              </div>
            ) : (
              <div className="lg:flex hidden">
                <NavbarButton />
              </div>
            )}

            {/* {isLogin ? (
              <div className="avatar">
                <div className=" size-10  rounded-full ring  ring-white">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            ) : (
              <div className="lg:flex hidden">
                <NavbarButton />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
