"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Layout, Menu } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { currentToken } from "@/redux/features/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { TSidebarItem, TUser } from "@/types/shared.type";
import { sideBarItemsGenerator } from "@/utils/sideBarItemsGenerator";
import { adminPaths } from "@/routes/admin.routes";
import { userPaths } from "@/routes/user.routes";
import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
  const token = useAppSelector(currentToken);
  const [collapsed, setCollapsed] = useState(false);
  const location = usePathname();
  const [, setIsMobile] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // checking user role
  let user: TUser | null = null;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  let sidebarItems: TSidebarItem[] = [];

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sideBarItemsGenerator(adminPaths, userRole.ADMIN, collapsed);
      break;
    case userRole.USER:
      sidebarItems = sideBarItemsGenerator(userPaths, userRole.USER, collapsed);
      break;
    default:
      sidebarItems = [];
  }

  const menu: ItemType[] = sidebarItems.map((menu, index) => {
    return {
      key: `sub${index}`,
      icon: menu.icon,
      label: menu.label,
      children: menu?.children?.map((childMenu, j) => {
        const subKey = `${index}-${j}`;
        return {
          key: subKey,
          label: (
            <Link href={`/${user?.role}/${childMenu.path}`} className="text-white">
              {childMenu.label}
            </Link>
          ),
        };
      }),
    };
  });

  useEffect(() => {
    // Update selected key based on the current route
    const activePath = sidebarItems?.flatMap((menu) =>
      menu.children?.map((child) => child.path)
    );
    const activeKey = activePath.find((path) => location.includes(path as string));
    if (activeKey) {
      setSelectedKeys([activeKey]);
    }
  }, [location]);

  return (
    <Sider
    className="pt-20 overflow-hidden left-0"
      style={{ minHeight: "100vh", background: "#1B1F3B" }}
      width={200}
      collapsed={collapsed}
      breakpoint="md"
      onBreakpoint={(broken) => {
        setIsMobile(broken);
        setCollapsed(broken);
      }}
      onCollapse={(collapse) => setCollapsed(collapse)}
    >
      <Button
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, color: "white" }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        inlineCollapsed={collapsed}
        style={{
          height: "100%",
          backgroundColor: "#1B1F3B",
        }}
        theme="dark"
        items={menu} 
      />
    </Sider>
  );
};

export default Sidebar;
