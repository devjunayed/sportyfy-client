import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div>
      <div className="mx-10 text-center bg-[#1B1F3B] text-white py-10 my-4 rounded-md uppercase font-bold text-xl flex justify-center items-center gap-2">
        <Link className="flex justify-center items-center gap-1" to={"/"}>
          <HomeFilled />Home{" "}
        </Link>{" "}
        / Contact Us
      </div>
    </div>
  );
};

export default ContactUs;
