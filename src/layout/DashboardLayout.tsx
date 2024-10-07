import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Shared/Navbar/Navbar";
import Sidebar from "./Sidebar"; // Sidebar handles menu generation based on role

const { Content } = Layout;

const DashboardLayout: React.FC = () => {
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
            <Sidebar /> {/* Sidebar generates dynamic menu based on user role */}
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Outlet /> {/* Dynamic content rendered here */}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default DashboardLayout;
