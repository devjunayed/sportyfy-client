"use client";
import Logo from "../Logo/Logo";
import { FaFacebook, FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import {  Input } from "@heroui/input";
import {Button} from "@heroui/button";

const Footer = () => {
  return (
    <footer className="bg-[#1B1F3B] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo and Intro */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <Logo />
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            Your one-stop platform for booking sports facilities — fast, easy, and secure.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-2 inline-block">
            Links
          </h6>
          <ul className="space-y-2">
            <li><Link href="/about-us" className="hover:text-gray-300">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            <li><a className="hover:text-gray-300 cursor-pointer">Jobs</a></li>
            <li><a className="hover:text-gray-300 cursor-pointer">Press Kit</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-2 inline-block">
            Legal
          </h6>
          <ul className="space-y-2">
            <li><a className="hover:text-gray-300 cursor-pointer">Terms of Use</a></li>
            <li><a className="hover:text-gray-300 cursor-pointer">Privacy Policy</a></li>
            <li><a className="hover:text-gray-300 cursor-pointer">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h6 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-2 inline-block">
            Stay Connected
          </h6>
          <div className="flex gap-4 mb-6 text-2xl">
            <a href="#" className="hover:text-blue-400 transition-all"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-400 transition-all"><FaFacebookMessenger /></a>
            <a href="#" className="hover:text-green-400 transition-all"><FaWhatsapp /></a>
          </div>

          <h6 className="text-lg font-semibold mb-2">Newsletter</h6>
          <div className="flex w-full">
            <Input
              placeholder="Enter your email"
              radius="sm"
              size="sm"
              className="bg-white text-black"
              endContent={
                <Button
                  color="primary"
                  radius="sm"
                  size="sm"
                  className="text-white bg-[#111827]"
                >
                  Subscribe
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-300">
        <p>
          © {new Date().getFullYear()} SportyFy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
