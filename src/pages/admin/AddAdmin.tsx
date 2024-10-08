import React from "react";
import { Button, Form, Input, message } from "antd";


import { useDispatch } from "react-redux";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useForm } from "antd/es/form/Form";
import { useAppSelector } from "../../redux/hooks";
import { RegistrationFieldType } from "../../types/registration.type";
import { ErrorResponse } from "../../types/shared.type";
import { clearRegisterForm, setAddress, setEmail, setName, setPassword, setPhone } from "../../redux/features/registerSlice";
import { useRegisterMutation } from "../../redux/api/auth/authApi";

const AddAdmin: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { name, email, phone, address, password } = useAppSelector(
    (state) => state.register
  ) as RegistrationFieldType;
  const [register] = useRegisterMutation();
  const [form] = useForm();

  const onFinish = async () => {
    try {
      const user = await register({
        name,
        email,
        password,
        phone,
        address,
        role: "admin",
      } as RegistrationFieldType);

      // Handle error response
      if (user.error) {
        const error = user.error as FetchBaseQueryError;
        if ("data" in error) {
          messageApi.open({
            type: "error",
            content: (error?.data as ErrorResponse)?.message,
          });
        } else {
          console.log("No data property found in the error object");
        }
      }

      // Handle success response
      if (user?.data?.success) {
        messageApi.open({
          type: "success",
          content: "User registered successfully",
        });

        // Clear Redux state
        dispatch(clearRegisterForm());

        // Manually reset form fields
        form.setFieldsValue({
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
        });

        console.log("Form and Redux state cleared.");
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Error while creating user!",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {contextHolder}
   
      
        <Form
          className="w-full md:w-1/2 p-10 md:pl-0"
          name="trigger"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          form={form}
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
              placeholder="Enter your name"
              className="w-full white-placeholder"
              inputMode="text"
              value={name}
              onChange={(e) => {
                dispatch(setName(e.target.value));
              }}
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
              placeholder="Enter your email"
              className="w-full"
              value={email}
              onChange={(e) => {
                dispatch(setEmail(e.target.value));
              }}
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
              value={password}
              onChange={(e) => {
                dispatch(setPassword(e.target.value));
              }}
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
              placeholder="Enter your phone number"
              className="w-full"
              value={phone}
              onChange={(e) => {
                dispatch(setPhone(e.target.value));
              }}
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
              placeholder="Enter your address"
              className="w-full white-placeholder"
              value={address}
              onChange={(e) => {
                dispatch(setAddress(e.target.value));
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default AddAdmin;
