import React, { useState, useEffect } from "react";
import {
  FolderOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/ui/Shared/Navbar/Navbar";

const { Content, Sider } = Layout;

const menusLink = [
  {
    text: "Category",
    icon: FolderOutlined,
    children: [
      {
        path: "/dashboard/create-category",
        text: "Create Category",
      },
      {
        path: "/dashboard/manage-category",
        text: "Manage Category",
      },
    ],
  },
  {
    text: "Products",
    icon: AppstoreOutlined,
    children: [
      {
        path: "/dashboard/create-products",
        text: "Create Products",
      },
      {
        path: "/dashboard/manage-products",
        text: "Manage Products",
      },
    ],
  },
];

// Mapping menu links to Menu components
const menu = menusLink.map((menu, index) => {
  return {
    key: `sub${index}`,
    icon: React.createElement(menu.icon),
    label: `${menu.text}`,
    children: menu.children.map((childMenu, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: (
          <Link to={childMenu.path} className="text-white">
            {childMenu.text}
          </Link>
        ),
      };
    }),
  };
});

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [, setIsMobile] = useState(false);
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Get active route
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  
  useEffect(() => {
    // Update selected key based on the current route
    const activePath = menusLink.flatMap((menu) => 
      menu.children.map((child) => child.path)
    );
    const activeKey = activePath.find((path) => location.pathname.includes(path));
    if (activeKey) {
      setSelectedKeys([activeKey]);
    }
  }, [location]);

  // Using Ant Design token for theme customization
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Navbar />
      <Layout>
        <Content>
          <Layout
            style={{
              background: "#fff",
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider
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
                style={{ marginBottom: 16, color: "white" }} // White button text
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
              <Menu
                mode="inline"
                selectedKeys={selectedKeys} // Set the selected keys
                defaultOpenKeys={["sub2"]}
                inlineCollapsed={collapsed}
                style={{
                  height: "100%",
                  backgroundColor: "#1B1F3B", // Black background
                }}
                theme="dark"
                items={menu}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default DashboardLayout;
