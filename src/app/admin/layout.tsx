import Navbar from "@/components/Shared/Navbar/Navbar";
import Sidebar from "./components/Sidebar";
import type { Metadata } from "next";
import Layout, { Content } from "antd/es/layout/layout";



export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Layout>
        <Content>
          <Layout
            style={{
              background: "#fff",
            }}
          >
            <Sidebar />
            <Content className="px-6 mx-auto" style={{ minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
