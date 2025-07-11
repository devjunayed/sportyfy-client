import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import { currentUser, logOut } from "../../../../redux/features/authSlice";
import { useDispatch } from "react-redux";

const NavbarButton = ({ className }: { className?: string }) => {
  const user = useAppSelector(currentUser);
  const dispatch = useDispatch();

  return (
    <>
      {!user ? (
        <Button
          className={`text-white flex items-center justify-center ${className}`}
        >
          <Link to="/login" className="mx-auto">
            Login
          </Link>
          /
          <Link to="/register" className="mx-auto">
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
