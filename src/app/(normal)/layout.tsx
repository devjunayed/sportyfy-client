import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sportyfy | Make your game",
  description:
    "A sporty facility booking system where user and admin can manage bookings seemlesly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
