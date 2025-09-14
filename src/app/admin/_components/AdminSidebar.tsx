"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Layout, Menu } from "antd";
import { useAppSelector } from "@/redux/hooks";
import {  currentUser } from "@/redux/features/authSlice";
import { TSidebarItem } from "@/types/shared.type";
import { sideBarItemsGenerator } from "@/utils/sideBarItemsGenerator";
import { adminPaths } from "@/routes/admin.routes";
import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;


const AdminSidebar = () => {
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector(currentUser);
  const [collapsed, setCollapsed] = useState(false);
  const location = usePathname();
  const [, setIsMobile] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);


  const sidebarItems: TSidebarItem[] = sideBarItemsGenerator(adminPaths, user?.role, collapsed);

  

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
    setMounted(true);
    // Update selected key based on the current route
    const activePath = sidebarItems?.flatMap((menu) =>
      menu.children?.map((child) => child.path)
    );
    const activeKey = activePath.find((path) => location.includes(path as string));
    if (activeKey) {
      setSelectedKeys([activeKey]);
    }
  }, [location]);

  if (!mounted) {
    return null; // or a loader placeholder if you want
  }

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

export default AdminSidebar;
