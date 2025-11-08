/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Card } from "@heroui/card";
// import { useDispatch } from "react-redux";
// import { setEmail, setPassword } from "@/redux/features/loginSlice";

import {
  RiAdminFill,
  RiAdminLine,
  RiLock2Line,
  RiUserLine,
} from "react-icons/ri";
import { BiLogIn, BiUser } from "react-icons/bi";

import Link from "next/link";

import SForm from "@/components/Form/SForm";
import SInput from "@/components/Form/SInput";
import { FieldValues } from "react-hook-form";
import SButton from "@/components/UI/SButton";
import Logo from "../../../../components/Shared/Logo/Logo";
import { FaGoogle, FaUserLock } from "react-icons/fa";

/*===================================
       Main Login function
=====================================*/
const Login: React.FC = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams(); // ✅ for query string like ?redirect=/something

  // const dispatch = useDispatch();
  // const { email, password } = useAppSelector((state) => state.login);
  // const [login] = useLoginMutation();

  // const onFinish = async () => {
  //   try {
  //     const { data: loginResult } = await login({ email, password });

  //     console.log(loginResult.token);

  //     if (loginResult?.success) {
  //       const user = verifyToken(loginResult.token as string);

  //       if (user) {
  //         toast.success("Logged in successfully");
  //         dispatch(
  //           setUser({
  //             user: {
  //               name: loginResult?.data?.name,
  //               email: loginResult?.data?.email,
  //               role: loginResult?.data?.role,
  //               _id: loginResult?.data?._id,
  //             },
  //             token: loginResult?.token,
  //           })
  //         );
  //       }

  //       const redirectParam = searchParams.get("redirect");
  //       const role = user?.role;

  //       if (redirectParam) {
  //         router.push(redirectParam);
  //       } else {
  //         router.push(`/${role}/dashboard`);
  //       }
  //     } else {
  //       const error = loginResult.error as FetchBaseQueryError;
  //       if ("data" in error) {
  //         toast.error((error?.data as ErrorResponse).message);
  //       }
  //     }
  //   } catch (error) {
  //     console.log({ LoginError: error });
  //     toast.success("Something went wrong!");
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
        <div className="flex justify-center flex-col gap-4 items-center">
          <Logo />
          <p className="text-default-600">Login in  your account</p>
        </div>
        <div className="w-full ">
          <SForm onSubmit={(values) => handleSubmit(values)}>
            <div className="flex flex-col gap-4">
              <div className="flex  justify-center items-center gap-3 w-full">
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
              </div>
              <SInput
                name="email"
                label="Enter your email"
                required={true}
                type="email"
                className="w-full"
              />

              {/* Password Field */}

              <SInput
                name="password"
                label="Enter your password"
                required={true}
                className="w-full"
              />

              <SButton type="submit" className="bg-black text-white">
                Login <BiLogIn size={18} />
              </SButton>

              <p className="text-right -my-2 text-sm text-default-700">
                Don&apos;t have an account{" "}
                <Link href="/register" className="underline">
                  Register
                </Link>
              </p>

              <p className="text-center text-default-700">OR</p>
              <SButton className="bg-orange-600 text-white w-full flex justify-center items-center gap-2">
                Sign in with Google <FaGoogle size={18} />
              </SButton>
            </div>
            {/* Email Field */}

            {/* Submit Button */}
          </SForm>
        </div>
      </Card>
    </div>
  );
};

export default Login;
