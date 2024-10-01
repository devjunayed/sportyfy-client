/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { LoginFieldType } from "../../types/login.type";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

/*===================================
       Main Registration function
=====================================*/
const Registration: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: LoginFieldType) => {
    try {
      const userData = {
        email: values.email,
        password: values.password,
      };

      console.log("Sending userData to the server:", userData);

      // Send data to your server
      // const category = await createCategory(categoryData);
      // if (category.data.success) {
      //   messageApi.open({
      //     type: "success",
      //     content: "Category successfully created",
      //   });
      // } else {
      //   messageApi.open({
      //     type: "error",
      //     content: category.data.message,
      //   });
      // }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Error uploading image!",
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
            backgroundImage: "url(./src/assets/images/registration.jpg)",
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
                Please sign in with your details or sign in with
                google and start enjoying all the benefits we offer.
              </p>
            </div>
            <div className="mx-10 text-center">
              <p className="pt-10">
              <Button className="justify-center items-center mx-auto my-6 text-white flex"><FcGoogle /> Sign In With Google</Button>
              Don't have an account <Link to="/register" className="underline">Register</Link>
              </p>
            </div>
          </div>
        </div>
        <Form
          className="w-full md:w-1/2  p-10 md:pr-0"
          name="trigger"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
       

          {/* Email Field */}
          <Form.Item
            className="w-full"
            hasFeedback
            label={<span className="">Email</span>}
            name="email"
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
              style={{ color: "white" }}
              placeholder="Enter your email"
              className="w-full"
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            className="w-full"
            hasFeedback
            label={<span className="">Password</span>}
            name="password"
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
              style={{ color: "white" }}
              placeholder="Enter your password"
              className="w-full"
            />
          </Form.Item>

      

          {/* Submit Button */}
          <Form.Item className="flex justify-center">
            <Button type="default" htmlType="submit" className="bg-black text-white">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
