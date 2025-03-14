import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Shared/Navbar/Navbar";
import Sidebar from "./Sidebar"; 

const { Content } = Layout;

const DashboardLayout: React.FC = () => {

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
            <Sidebar /> 
            <Content className="px-6 mx-auto" style={{  minHeight: 280 }}>
              <Outlet /> 
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default DashboardLayout;
