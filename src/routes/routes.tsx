import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import App from "../App";
import { viewersPath } from "./viewers.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(viewersPath)
  },
  {
    path: "/admin",
    element: <div>ajsdfj</div>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <div>ajsdfj</div>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
]);

export default router;
