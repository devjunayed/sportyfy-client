"use client";

import { currentUser, logOut } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { viewersPath } from "@/routes/viewers.routes";
import { ThemeSwitch } from "./theme-switch";
import Button from "./UI/Button";
import Logo from "./Shared/Logo/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const AppNavbar = () => {
  const user = useAppSelector(currentUser);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const dashboardHref = `/${user?.role || "user"}/dashboard`;

  const handleLogout = () => {
    dispatch(logOut());
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    setMenuOpen(false);
    router.replace("/login");
    router.refresh();
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setIsAtTop(currentY <= 10);

      // if menu is open, keep navbar visible
      if (menuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      if (currentY > lastScrollY.current && currentY > 100) {
        // scrolling down
        setIsVisible(false);
      } else {
        // scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = (href: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      pathname === href
        ? "bg-white text-[#1B1F3B]"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header
      className={
        "sticky top-0 z-50 text-white shadow-sm transform transition-transform duration-300 " +
        (pathname === "/" && isAtTop
          ? "bg-transparent border-none"
          : "border-b border-white/10 bg-[#1B1F3B]") +
        " " +
        (menuOpen
          ? "translate-y-0"
          : isVisible
            ? "translate-y-0"
            : "-translate-y-full")
      }
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {viewersPath.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={navLinkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <Link href={dashboardHref} className={navLinkClass(dashboardHref)}>
              Dashboard
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitch />
          {user ? (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href={dashboardHref}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-sm font-semibold text-[#1B1F3B]"
                title={user.name}
              >
                {initials}
              </Link>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                href="/login"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                Login
              </Button>
              <Button href="/register" variant="secondary">
                Register
              </Button>
            </div>
          )}
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-[#1B1F3B] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {viewersPath.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={navLinkClass(link.path)}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link
                href={dashboardHref}
                className={navLinkClass(dashboardHref)}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : null}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:hidden">
            {user ? (
              <>
                <div className="rounded-md bg-white/10 px-3 py-2 text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-white/70">{user.email}</div>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button href="/login" variant="secondary" fullWidth>
                  Login
                </Button>
                <Button href="/register" fullWidth>
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default AppNavbar;
