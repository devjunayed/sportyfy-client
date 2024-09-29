import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#dedede",
        colorBgContainer: "#fffff"
      }
    }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
