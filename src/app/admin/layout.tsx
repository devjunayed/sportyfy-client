import Navbar from "@/components/Shared/Navbar/Navbar";
import type { Metadata } from "next";
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
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar hideOnScroll={false} position="fixed" />
      </Suspense>
      <div className="pt-16 mt-4 mx-auto flex w-full max-w-425 flex-col px-4 py-6 lg:px-8">
        <div className="flex flex-col  lg:flex-row gap-4">
          <div className="w-full  lg:w-72">
            <AdminSidebar />
          </div>
          <main className="w-full rounded-3xl bg-white shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
