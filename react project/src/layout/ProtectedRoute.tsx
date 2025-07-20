import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { currentToken, logOut } from "../redux/features/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const router = useRouter();
  const location = router.pathname;

  const token = useAppSelector(currentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useDispatch();

  const currentTime = Math.floor(Date.now() / 1000);

  if (!token) {
    router.replace(`/login?redirect=${location}`);
  }

  if (
    (role !== undefined && role !== (user?.role as string)) ||
    (user?.exp as number) < currentTime
  ) {
    dispatch(logOut());

    router.replace(`/login?redirect=${location}`);
  }

  return children;
};

export default ProtectedRoute;
