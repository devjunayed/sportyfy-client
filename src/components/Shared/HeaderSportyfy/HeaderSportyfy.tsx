import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeaderSportyfy = ({ text }: { text: string }) => {
  return (
    <div className=" text-center bg-[#1B1F3B] text-white py-10 my-4 rounded-md uppercase font-bold text-xl flex justify-center items-center gap-2">
      <Link className="flex justify-center items-center gap-1" to={"/"}>
        <HomeFilled />
        Home{" "}
      </Link>{" "}
      / {text}
    </div>
  );
};

export default HeaderSportyfy;
