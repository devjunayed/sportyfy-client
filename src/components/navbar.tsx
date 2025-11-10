"use client";
import { Input } from "@heroui/input";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import Link from "next/link";
import { Avatar } from "@heroui/avatar";
import Logo from "./Shared/Logo/Logo";

import { ThemeSwitch } from "./theme-switch";
import { SearchIcon } from "./icons";
import { Button } from "@heroui/button";
import { viewersPath } from "@/routes/viewers.routes";

export default function App() {
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  const menuItems = ["Profile", "Dashboard", "Activity", "Analytics", "System"];
  return (
    <Navbar maxWidth="2xl" shouldHideOnScroll   className="mx-0 px-0  dark text-white"  isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      {/* Large menu */}
      <NavbarContent className="hidden sm:flex gap-3">
        {viewersPath.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === viewersPath.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>

      {/* small menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarMenu>
          {viewersPath.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === viewersPath.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.path}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <ThemeSwitch />
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="hidden sm:flex">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={items}>
            {(item) => (
              <DropdownItem
                key={item.key}
                className={item.key === "delete" ? "text-danger" : ""}
                color={item.key === "delete" ? "danger" : "default"}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="warning" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarContent as="div" className="sm:hidden ">
          <NavbarMenuToggle />
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
