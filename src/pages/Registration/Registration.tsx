/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Form, Input, message } from "antd";
import { RegistrationFieldType } from "../../types/registration.type";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

/*===================================
       Main Registration function
=====================================*/
const Registration: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: RegistrationFieldType) => {
    try {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
        user: "user"
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
      <div className="flex shadow-xl flex-col md:flex-row shadow-gray-400 rounded-2xl h-full my-10 md:h-[80vh] w-[90vw] md:w-[80vw] lg:w-[60vw]  gap-8 justify-center items-center">
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
                Create Your Account
              </h2>
              <p className="text-justify text-lg">
                Welcome to Sportyfy! <br />
                Please fill out the form to create a new account or sign in with
                google and start enjoying all the benefits we offer.
              </p>
            </div>
            <div className="mx-10 text-center">
              <p className="pt-10">
              <Button className="justify-center items-center mx-auto my-6 text-white flex"><FcGoogle /> Sign In With Google</Button>
              Already have an account <Link to="/login" className="underline">Login</Link>
              </p>
            </div>
          </div>
        </div>
        <Form
          className="w-full   md:w-1/2  p-10 md:pl-0"
          name="trigger"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* Name Field */}
          <Form.Item
            className="w-full"
            hasFeedback
            label={<span className="">Name</span>}
            name="name"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                max: 30,
              },
            ]}
          >
            <Input
              style={{ color: "white" }}
              placeholder="Enter your name"
              className="w-full white-placeholder"
              inputMode="text"
              onChange={(e) => console.log(e.target.value)}
            />
          </Form.Item>

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
              placeholder="Enter your password"
              className="w-full"
            />
          </Form.Item>

          {/* Phone Field */}
          <Form.Item
            className="w-full"
            hasFeedback
            label={<span className="">Phone</span>}
            name="phone"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              style={{ color: "white" }}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </Form.Item>

          {/* Address Field */}
          <Form.Item
            className="w-full white-placeholder"
            hasFeedback
            label={<span className="">Address</span>}
            name="address"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              style={{ color: "white" }}
              placeholder="Enter your address"
              className="w-full white-placeholder"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="flex justify-center">
            <Button type="default" htmlType="submit" className=" bg-black text-white">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
