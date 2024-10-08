import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { currentToken, logOut } from "../redux/features/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(currentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }


  const dispatch = useDispatch();

  const currentTime = Math.floor(Date.now() / 1000);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (
    role !== undefined &&
    role !== (user?.role as string) ||
    (user?.exp as number) < currentTime
  ) {
    dispatch(logOut());

    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
