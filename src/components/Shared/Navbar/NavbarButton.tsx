import { Button } from "antd";
import { useAppSelector } from "@/redux/hooks"; 
import { currentUser, logOut } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const NavbarButton = ({ className }: { className?: string }) => {
  const user = useAppSelector(currentUser);
  const dispatch = useDispatch();

  return (
    <>
      {!user ? (
        <Button
          className={`text-white flex items-center justify-center ${className}`}
        >
          <Link href="/login" className="mx-auto">
            Login
          </Link>
          /
          <Link href="/register" className="mx-auto">
            Register
          </Link>
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(logOut())}
          className={`text-white flex items-center justify-center ${className}`}
        >
          Logout
        </Button>
      )}
    </>
  );
};

export default NavbarButton;
