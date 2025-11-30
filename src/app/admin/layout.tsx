import Navbar from "@/components/Shared/Navbar/Navbar";
import type { Metadata } from "next";
import Layout, { Content } from "antd/es/layout/layout";
import AdminSidebar from "./dashboard/_components/AdminSidebar";
import NavbarSkeleton from "@/components/Shared/Navbar/NavbarSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <Layout>
        <Content>
          <Layout
            style={{
              background: "#fff",
            }}
          >
            <AdminSidebar />
            <Content className="px-6 mx-auto" style={{ minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
}
