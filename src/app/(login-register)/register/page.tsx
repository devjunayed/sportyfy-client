"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Next.js Router
// import { useRegisterMutation } from "@/redux/api/auth/authApi";
// import { useDispatch } from "react-redux";
// import {
//   clearRegisterForm,
//   setAddress,
//   setEmail,
//   setName,
//   setPassword,
//   setPhone,
// } from "@/redux/features/registerSlice";
// import { useAppSelector } from "@/redux/hooks";
import { RegistrationFieldType } from "@/types/registration.type";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorResponse } from "@/types/shared.type";
import { Card } from "@heroui/card";
import Logo from "@/components/Shared/Logo/Logo";
import SForm from "@/components/Form/SForm";
import SButton from "@/components/UI/SButton";
import { RiAdminLine, RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import SInput from "@/components/Form/SInput";
import { BiLogIn } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";
import { FieldValues } from "react-hook-form";

const Registration: React.FC = () => {
  const router = useRouter(); // ✅ Next.js navigation
  // const dispatch = useDispatch();
  // const { name, email, phone, address, password, role } = useAppSelector(
  //   (state) => state.register
  // );
  // const [register] = useRegisterMutation();
  // const [form] = useForm();

  // const onFinish = async () => {
  //   try {
  //     const user = await register({
  //       name,
  //       email,
  //       password,
  //       phone,
  //       address,
  //       role,
  //     } as RegistrationFieldType);

  //     if (user.error) {
  //       const error = user.error as FetchBaseQueryError;
  //       if ("data" in error) {
  //         messageApi.open({
  //           type: "error",
  //           content: (error?.data as ErrorResponse)?.message,
  //         });
  //       } else {
  //         console.log("No data property found in the error object");
  //       }
  //     }

  //     if (user?.data?.success) {
  //       messageApi
  //         .open({
  //           type: "success",
  //           content: "User registered successfully",
  //         })
  //         .then(() => {
  //           dispatch(clearRegisterForm());
  //           form.setFieldsValue({
  //             name: "",
  //             email: "",
  //             phone: "",
  //             address: "",
  //             password: "",
  //           });
  //           router.push("/login"); // ✅ replaced navigate
  //           console.log("Form and Redux state cleared.");
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     messageApi.open({
  //       type: "error",
  //       content: "Error while creating user!",
  //     });
  //   }
  // };

  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card
        isFooterBlurred
        className="max-w-full p-10 min-w-[600px] gap-7  min-h-[300px] flex sm:col-span-7"
      >
        <div className="flex justify-center flex-col items-center gap-4">
          <Logo />
          <p className="text-default-600">Register your account</p>
        </div>
        <div className="w-full ">
          <SForm onSubmit={(values) => handleSubmit(values)}>
            <div className="flex flex-col gap-4">
              {/* <div className="flex  justify-center items-center gap-3 w-full">
                <SButton
                  onClick={() => {
                    // const adminEmail = "admin@gmail.com";
                    // const adminPassword = "admin123";
                    // dispatch(setEmail(adminEmail));
                    // dispatch(setPassword(adminPassword));
                    // form.setFieldsValue({
                    //   email: adminEmail,
                    //   password: adminPassword,
                    // });
                  }}
                  className="bg-black text-white w-full"
                >
                  Admin Login <RiAdminLine size={18} />
                </SButton>
                <SButton
                  onClick={() => {
                    // const userEmail = "user@gmail.com";
                    // const userPassword = "user123";
                    // dispatch(setEmail(userEmail));
                    // dispatch(setPassword(userPassword));
                    // form.setFieldsValue({
                    //   email: userEmail,
                    //   password: userPassword,
                    // });
                  }}
                  className="bg-black text-white w-full"
                >
                  User Login <RiUserLine size={18} />
                </SButton>
              </div> */}
              {/* Name */}
              <SInput
                name="name"
                label="Enter your name"
                required={true}
                type="text"
                className="w-full"
              />
              {/* Email */}
              <SInput
                name="email"
                label="Enter your email"
                required={true}
                type="email"
                className="w-full"
              />
              <div className="flex gap-4">
                 {/* Address */}
              <SInput
                name="address"
                label="Enter your address"
                required={true}
                type="text"
                className="w-full"
              />
              {/* Phone */}
              <SInput
                name="phone"
                label="Enter your phone"
                required={true}
                type="text"
                className="w-full"
              />
                </div>
             
            <div className="flex gap-4 ">
                 {/* Password Field */}

              <SInput
                name="password"
                label="Enter your password"
                required={true}
                className="w-full"
              />
              {/* Confirm Password Field */}

              <SInput
                name="password"
                label="Enter your password again"
                required={true}
                className="w-full"
              />

              </div>
           
              <SButton type="submit" className="bg-black text-white">
                Register <BiLogIn size={18} />
              </SButton>

              <p className="text-right -my-2 text-sm text-default-700">
                Already have an account{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </p>

              {/* <p className="text-center text-default-700">OR</p>
              <SButton className="bg-orange-600 text-white w-full flex justify-center items-center gap-2">
                Sign in with Google <FaGoogle size={18} />
              </SButton> */}
            </div>
          </SForm>
        </div>
      </Card>
    </div>
    // <div className="min-h-screen flex justify-center items-center">
    //   <div className="flex shadow-xl flex-col md:flex-row shadow-gray-400 rounded-2xl h-full my-10 md:h-[80vh] w-[90vw] md:w-[80vw] lg:w-[60vw] gap-8 justify-center items-center">
    //     <div
    //       className="hero min-h-[80vh] w-full md:w-1/2 rounded-2xl"
    //       style={{
    //         backgroundImage: `url(assets/images/registration.jpg)`,
    //       }}
    //     >
    //       <div className="hero-overlay bg-opacity-70 rounded-2xl"></div>
    //       <div className="text-neutral-content">
    //         <div className="max-w-md mx-10">
    //           <h2 className="text-2xl font-bold uppercase mb-6">
    //             Create Your Account
    //           </h2>
    //           <p className="text-justify text-lg">
    //             Welcome to Sportyfy! <br />
    //             Please fill out the form to create a new account or sign in with
    //             Google and start enjoying all the benefits we offer.
    //           </p>
    //         </div>
    //         <div className="mx-10 text-center">
    //           <p className="pt-10">
    //             Already have an account?{" "}
    //             <Link href="/login" className="underline">
    //               Login
    //             </Link>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-full md:w-1/2 pr-10">
    //       <Form
    //         className="  p-10 md:pl-0"
    //         name="trigger"
    //         layout="vertical"
    //         autoComplete="off"
    //         onFinish={onFinish}
    //         form={form}
    //       >
    //         {/* Name Field */}
    //         <Form.Item
    //           className="w-full"
    //           hasFeedback
    //           label="Name"
    //           name="name"
    //           validateTrigger="onBlur"
    //           rules={[
    //             { required: true, message: "Please input your name!", max: 30 },
    //           ]}
    //         >
    //           <Input
    //             placeholder="Enter your name"
    //             className="w-full white-placeholder"
    //             value={name}
    //             onChange={(e) => dispatch(setName(e.target.value))}
    //           />
    //         </Form.Item>

    //         {/* Email Field */}
    //         <Form.Item
    //           className="w-full"
    //           hasFeedback
    //           label="Email"
    //           name="email"
    //           validateTrigger="onBlur"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please input your email!",
    //               type: "email",
    //             },
    //           ]}
    //         >
    //           <Input
    //             placeholder="Enter your email"
    //             className="w-full"
    //             value={email}
    //             onChange={(e) => dispatch(setEmail(e.target.value))}
    //           />
    //         </Form.Item>

    //         {/* Password Field */}
    //         <Form.Item
    //           className="w-full"
    //           hasFeedback
    //           label="Password"
    //           name="password"
    //           validateTrigger="onBlur"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please input your password!",
    //               min: 6,
    //             },
    //           ]}
    //         >
    //           <Input.Password
    //             placeholder="Enter your password"
    //             className="w-full"
    //             value={password}
    //             onChange={(e) => dispatch(setPassword(e.target.value))}
    //           />
    //         </Form.Item>

    //         {/* Phone Field */}
    //         <Form.Item
    //           className="w-full"
    //           hasFeedback
    //           label="Phone"
    //           name="phone"
    //           validateTrigger="onBlur"
    //           rules={[
    //             { required: true, message: "Please input your phone number!" },
    //           ]}
    //         >
    //           <Input
    //             placeholder="Enter your phone number"
    //             className="w-full"
    //             value={phone}
    //             onChange={(e) => dispatch(setPhone(e.target.value))}
    //           />
    //         </Form.Item>

    //         {/* Address Field */}
    //         <Form.Item
    //           className="w-full white-placeholder"
    //           hasFeedback
    //           label="Address"
    //           name="address"
    //           validateTrigger="onBlur"
    //           rules={[
    //             { required: true, message: "Please input your address!" },
    //           ]}
    //         >
    //           <Input
    //             placeholder="Enter your address"
    //             className="w-full white-placeholder"
    //             value={address}
    //             onChange={(e) => dispatch(setAddress(e.target.value))}
    //           />
    //         </Form.Item>

    //         {/* Submit Button */}
    //         <Form.Item className="flex justify-center">
    //           <Button
    //             type="default"
    //             htmlType="submit"
    //             className="bg-black text-white"
    //           >
    //             Register
    //           </Button>
    //         </Form.Item>
    //       </Form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Registration;
