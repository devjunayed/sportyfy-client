import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sportyfy | Make your game",
  description: "A sporty facility booking system where user and admin can manage bookings seemlesly.",
};

export default function NormalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>

        <Navbar />
        {children}
        <Footer />
    </div>
  );
}
