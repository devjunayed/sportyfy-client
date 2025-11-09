"use client";
import Logo from "../Logo/Logo";
import { FaFacebook, FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@heroui/button";
import SInput from "@/components/Form/SInput";
import SForm from "@/components/Form/SForm";

const Footer = () => {
  const onSearch = () => {};
  return (
    <div className="w-full  bg-[#1B1F3B]">
      <footer className="footer flex justify-between max-w-7xl mx-auto px-4 md:px-0 text-white py-10">
        <aside className="flex  justify-center text-center items-center flex-col">
          <Logo />
        </aside>
        <nav>
          <h6 className="footer-title">Links</h6>
          <Link href="/about-us" className="link link-hover">
            About us
          </Link>
          <Link href="/contact" className="link link-hover">
            Contact
          </Link>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-4 ">
            <a className="link link-hover text-white text-2xl">
              <FaFacebook />
            </a>
            <a className="link link-hover text-white text-2xl">
              <FaFacebookMessenger />
            </a>
            <a className="link link-hover text-white text-2xl">
              <FaWhatsapp />
            </a>
          </div>
          <h6 className="footer-title mt-4">Newsletter</h6>
          <SForm onSubmit={() => {}}>
            <SInput
              name="newsletter"
              placeholder="input search text"
              // style={{backgroundColor: "white", borderRadius: '8px', border: "1px white"}}
              // allowClear
              end={
                <Button style={{ background: "black", color: "white" }}>
                  Subscribe
                </Button>
              }
              size="lg"
              // onSearch={onSearch}
            />
          </SForm>
        </nav>
      </footer>
      <footer className="footer border-t footer-center bg-[#1B1F3B] text-white p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            SportyFy
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
