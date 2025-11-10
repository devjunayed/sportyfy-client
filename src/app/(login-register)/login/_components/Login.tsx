"use client";
import React, { FormEvent, useRef, useState } from "react";
import { Card } from "@heroui/card";
import { RiAdminLine, RiUserLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import Link from "next/link";
import SButton from "@/components/UI/SButton";
import Logo from "../../../../components/Shared/Logo/Logo";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/api/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";
import { setUser } from "@/redux/features/authSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorResponse } from "@/types/shared.type";
import { Input } from "@heroui/input";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

/*===================================
       Main Login function
=====================================*/
const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const searchParams = useSearchParams(); // ✅ for query string like ?redirect=/something

  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const onFinish = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data: loginResult } = await login({ email, password });

      console.log(loginResult.token);

      if (loginResult?.success) {
        const user = verifyToken(loginResult.token as string);

        if (user) {
          toast.success("Logged in successfully");
          dispatch(
            setUser({
              user: {
                name: loginResult?.data?.name,
                email: loginResult?.data?.email,
                role: loginResult?.data?.role,
                _id: loginResult?.data?._id,
              },
              token: loginResult?.token,
            })
          );
        }

        const redirectParam = searchParams.get("redirect");
        const role = user?.role;

        if (redirectParam) {
          router.push(redirectParam);
        } else {
          router.push(`/${role}/dashboard`);
        }
      } else {
        const error = loginResult.error as FetchBaseQueryError;
        if ("data" in error) {
          toast.error((error?.data as ErrorResponse).message);
        }
      }
    } catch (error) {
      console.log({ LoginError: error });
      toast.success("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card
        isFooterBlurred
        className="max-w-full p-10 min-w-[600px] gap-7  min-h-[300px] flex sm:col-span-7"
      >
        <div className="flex justify-center flex-col gap-4 items-center">
          <Logo />
          <p className="text-default-600">Login in your account</p>
        </div>
        <div className="w-full ">
          <div className="flex  justify-center items-center gap-3 w-full mb-4">
            <SButton
              onClick={() => {
                const adminEmail = "admin@gmail.com";
                const adminPassword = "admin123";
                setEmail(adminEmail);
                setPassword(adminPassword);
              }}
              className="bg-black text-white w-full"
            >
              Admin Login <RiAdminLine size={18} />
            </SButton>
            <SButton
              onClick={() => {
                const userEmail = "user@gmail.com";
                const userPassword = "user123";
                setEmail(userEmail);
                setPassword(userPassword);
              }}
              className="bg-black text-white w-full "
            >
              User Login <RiUserLine size={18} />
            </SButton>
          </div>
          <form
            autoComplete="off"
            className="flex flex-col gap-4 pb-4 "
            onSubmit={(e) => onFinish(e)}
          >
            <Input
              name="email"
              variant="bordered"
              label="Enter your email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              labelPlacement="outside-top"
              className="w-full"
            />

            {/* Password Field */}
            <Input
              value={password}
              name="password"
              type={!passwordVisible ? "text" : "password"}
              variant="bordered"
              onChange={(e) => setPassword(e.target.value)}
              label="Enter your password"
              required={true}
              labelPlacement="outside-top"
              className="w-full"
              endContent={
                passwordVisible ? (
                  <EyeIcon
                    className="cursor-pointer text-gray-500"
                    onClick={() => setPasswordVisible(false)}
                  />
                ) : (
                  <EyeClosedIcon
                    className="cursor-pointer text-gray-500"
                    onClick={() => setPasswordVisible(true)}
                  />
                )
              }
            />

            <SButton type="submit" className="bg-black w-full text-white">
              Login <BiLogIn size={18} />
            </SButton>
          </form>
          <div className="flex flex-col gap-4">
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
        </div>
      </Card>
    </div>
  );
};

export default Login;
