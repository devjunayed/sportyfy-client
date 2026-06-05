"use client";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Logo from "../Logo/Logo";
import NavbarButton from "./NavbarButton";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/authSlice";
import { capitalize } from "@/utils/capitalize";
import { usePathname } from "next/navigation";
import { viewersPath } from "@/routes/viewers.routes";
import Link from "next/link";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import {
  IoPersonOutline,
  IoGridOutline,
  IoLogOutOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

interface NavbarProps {
  position?: "fixed" | "relative";
  hideOnScroll?: boolean;
}

const Navbar = ({
  position = "relative",
  hideOnScroll = true,
}: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAppSelector(currentUser);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuRef = useRef(menu);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menuRef.current = menu;
  }, [menu]);

  const getInitials = (name: string) => {
    const parts = name?.trim().split(/\s+/) ?? [];
    if (parts.length === 1) return capitalize(parts[0][0]);
    return capitalize(parts[0][0]) + capitalize(parts[parts.length - 1][0]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);

      // Only apply scroll-hide behavior when navbar is fixed and hideOnScroll is enabled
      if (position !== "fixed" || !hideOnScroll) {
        setIsVisible(true);
        return;
      }

      if (menuRef.current) {
        setIsVisible(true);
        lastScrollY.current = currentY;
        return;
      }
      if (currentY > lastScrollY.current && currentY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [position, hideOnScroll]);

  useEffect(() => {
    setMenu(false);
    setDropdownOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  const isDark = pathname !== "/" || isScrolled;

  return (
    <>
      {menu && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMenu(false)}
        />
      )}

      <div
        className={`${position === "fixed" ? "fixed" : "relative"} top-0 left-0 w-full z-50 transition-transform duration-300 ${
          position === "fixed" && !isVisible
            ? "-translate-y-full"
            : "translate-y-0"
        } ${isDark ? "bg-[#1B1F3B] shadow-md backdrop-blur-lg" : ""} text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* LEFT: Logo + desktop links */}
          <div className="flex items-center gap-8">
            <Logo />
            <ul className="hidden lg:flex items-center gap-1">
              {viewersPath.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10 ${
                      pathname === link.path ? "bg-white/15" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link
                    href={`/${user.role}/dashboard`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10 ${
                      pathname.includes("dashboard") ? "bg-white/15" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* RIGHT: Auth / Avatar */}
          <div className="flex items-center gap-3">
            {user ? (
              <div ref={dropdownRef} className="relative">
                {/* Avatar trigger */}
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-white/10 transition-colors"
                >
                  {/* Avatar circle */}
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-semibold text-white ring-2 ring-white/20 shrink-0">
                    {getInitials(user.name)}
                  </div>
                  {/* Name — hidden on small screens */}
                  <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <IoChevronDownOutline
                    size={14}
                    className={`hidden sm:block opacity-60 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown panel */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-64 rounded-xl bg-[#1B1F3B] border border-white/10 shadow-2xl overflow-hidden">
                    {/* User info header */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold text-white ring-2 ring-indigo-400/30 shrink-0">
                        {getInitials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-white/50 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5">
                      <Link
                        href={`/${user.role}/dashboard`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/8 hover:text-white transition-colors"
                      >
                        <IoGridOutline
                          size={16}
                          className="opacity-60 shrink-0"
                        />
                        Dashboard
                      </Link>
                      <Link
                        href={`/${user.role}/profile`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/8 hover:text-white transition-colors"
                      >
                        <IoPersonOutline
                          size={16}
                          className="opacity-60 shrink-0"
                        />
                        Profile
                      </Link>
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-white/10 py-1.5">
                      <div className="flex items-center gap-3 px-4 py-2.5">
                        <IoLogOutOutline
                          size={16}
                          className="opacity-60 shrink-0 text-red-400"
                        />
                        <NavbarButton className="text-sm text-red-400 hover:text-red-300 bg-transparent p-0 h-auto border-none" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex">
                <NavbarButton />
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMenu((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menu ? (
                <IoCloseOutline size={24} />
              ) : (
                <IoMenuOutline size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="bg-[#1B1F3B] border-t border-white/10 px-4 py-3 flex flex-col gap-1">
            {viewersPath.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/10 ${
                    pathname === link.path ? "bg-white/15" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link
                  href={`/${user.role}/dashboard`}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/10 ${
                    pathname.includes("dashboard") ? "bg-white/15" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!user && (
              <li className="pt-2 border-t border-white/10">
                <NavbarButton className="w-full" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
