/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail, setPassword } from "../redux/features/loginSlice";
import { useAppSelector } from "../redux/hooks";
import { useLoginMutation } from "../redux/api/auth/authApi";
import { ErrorResponse } from "../types/shared.type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setUser } from "../redux/features/authSlice";
import { verifyToken } from "../utils/verifyToken";
import bgImg from "../assets/images/registration.jpg";
import { LoginOutlined } from "@ant-design/icons";
import { RiAdminFill } from "react-icons/ri";
import { BiUser } from "react-icons/bi";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

/*===================================
       Main Login function
=====================================*/
const Login: React.FC = () => {
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { email, password } = useAppSelector((state) => state.login);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ email, password });
  }, [email, password, form]);

  const onFinish = async () => {
    try {
      // Send data to your server
      const loginResult = await login({ email, password });

      if (loginResult?.data?.success) {
        const user = verifyToken(loginResult.data.token);
        messageApi
          .open({
            type: "success",
            content: "Logged in successfully",
          })
          .then(() => {
            dispatch(
              setUser({
                user: user,
                token: loginResult.data.token,
              })
            );

            const userOrAdmin = ["user", "admin"].some((data) =>
              location.search.includes(data)
            );

            if (location.search && !userOrAdmin) {
              navigate(`${location.search.split("=")[1]}`);
            } else {
              navigate(`/${user.role}/dashboard`);
            }
          });
      } else {
        const error = loginResult.error as FetchBaseQueryError;

        if ("data" in error) {
          messageApi.open({
            type: "error",
            content: (error?.data as ErrorResponse).message,
          });
        }
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Something went wrong!",
      });
      return;
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center  ">
      {contextHolder}
      <div className="flex shadow-xl flex-col md:flex-row-reverse shadow-gray-400 rounded-2xl h-full my-10 md:h-[80vh] w-[90vw] md:w-[80vw] lg:w-[60vw]  gap-8 justify-center items-center overflow-x-hidden">
        <div
          className="hero min-h-[80vh] w-full md:w-1/2 rounded-2xl"
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        >
          <div className="hero-overlay bg-opacity-70 rounded-2xl"></div>
          <div className="text-neutral-content ">
            <div className="max-w-md mx-10">
              <h2 className="text-2xl font-bold uppercase mb-6">
                Login to Your Account
              </h2>
              <p className="text-justify text-lg">
                Welcome to Sportyfy! <br />
                Please sign in with your details or sign in with google and
                start enjoying all the benefits we offer.
              </p>
            </div>
            <div className="mx-10 text-center">
              <p className="pt-10">
                {/* <Button className="justify-center items-center mx-auto my-6 text-white flex">
                  <FcGoogle /> Sign In With Google
                </Button> */}
                Don't have an account{" "}
                <Link to="/register" className="underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Form
          className="w-full md:w-1/2  p-10 md:pr-0"
          name="trigger"
          layout="vertical"
          autoComplete="off"
          initialValues={{ email, password }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="flex items-center justify-center gap-4 my-6">
            <Button
              onClick={() => {
                const adminEmail = "admin@gmail.com";
                const adminPassword = "admin123";
                dispatch(setEmail(adminEmail));
                dispatch(setPassword(adminPassword));
                form.setFieldsValue({
                  email: adminEmail,
                  password: adminPassword,
                });
              }}
              className="bg-black text-white"
            >
              Admin Login <RiAdminFill />
            </Button>
            <Button
              onClick={() => {
                const userEmail = "user@gmail.com";
                const userPassword = "user123";

                dispatch(setEmail(userEmail));
                dispatch(setPassword(userPassword));

                form.setFieldsValue({
                  email: userEmail,
                  password: userPassword,
                });
              }}
              className="bg-black text-white"
            >
              User Login <BiUser />
            </Button>
          </div>
          {/* Email Field */}
          <Form.Item
            className="w-full"
            hasFeedback
            label={<span className="">Email</span>}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input
              value={email}
              name="email"
              placeholder="Enter your email"
              className="w-full"
              onChange={(e) => {
                e.preventDefault();
                dispatch(setEmail(e.target.value));
              }}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            className="w-full"
            hasFeedback
            label={<span className="">Password</span>}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                min: 6,
              },
            ]}
          >
            <Input.Password
              name="password"
              value={password}
              placeholder="Enter your password"
              className="w-full"
              onChange={(e) => {
                e.preventDefault();
                dispatch(setPassword(e.target.value));
              }}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="flex justify-center">
            <Button
              type="default"
              htmlType="submit"
              className="bg-black text-white"
            >
              Login <LoginOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
