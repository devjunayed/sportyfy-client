import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { FaFacebook, FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { Button, Input } from "antd";

const { Search } = Input;

const Footer = () => {
  const onSearch = () => {};
  return (
    <>
      <footer className="footer bg-black text-white p-10">
        <aside>
          <Logo />
        </aside>
        <nav>
          <h6 className="footer-title">Links</h6>
          <Link to="/about-us" className="link link-hover">
            About us
          </Link>
          <Link to="/contact" className="link link-hover">
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
          <Search
            placeholder="input search text"
            style={{backgroundColor: "white", borderRadius: '8px', border: "1px white"}}
            allowClear
            enterButton={
              <Button style={{ background: "black", color: "white", }}>
                Subscribe
              </Button>
            }
            size="large"
            onSearch={onSearch}
          />
        </nav>
      </footer>
      <footer className="footer border-t footer-center bg-black text-white p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            SportyFy
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
