import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { RegistrationFieldType } from "@/types/registration.type";
import { useRegisterMutation } from "@/redux/api/auth/authApi";
import { ErrorResponse } from "@/types/shared.type";
import {
  clearRegisterForm,
  setAddress,
  setEmail,
  setName,
  setPassword,
  setPhone,
} from "@/redux/features/registerSlice";
import Button from "@/components/UI/Button";

const AddAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const { name, email, phone, address, password } = useAppSelector(
    (state) => state.register,
  ) as RegistrationFieldType;
  const [register] = useRegisterMutation();
  const [loading, setLoading] = useState(false);

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const user = await register({
        name,
        email,
        password,
        phone,
        address,
        role: "admin",
      } as RegistrationFieldType);

      if (user.error) {
        const error = user.error as FetchBaseQueryError;
        if ("data" in error) {
          toast.error(
            (error?.data as ErrorResponse)?.message ||
              "Unable to create admin.",
          );
        } else {
          toast.error("Unable to create admin.");
        }
      } else if (user?.data?.success) {
        toast.success("User registered successfully");
        dispatch(clearRegisterForm());
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while creating user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 flex flex-col overflow-y-hidden justify-center items-center">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold bg-slate-950 text-white text-center p-4 rounded-3xl">
          Add Admin
        </h1>
        <form className="mt-8 grid gap-6" onSubmit={onFinish}>
          <label className="grid gap-2 text-sm text-slate-700">
            <span>Name</span>
            <input
              type="text"
              required
              maxLength={30}
              value={name ?? ""}
              onChange={(e) => dispatch(setName(e.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Enter your name"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Email</span>
            <input
              type="email"
              required
              value={email ?? ""}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Enter your email"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={password ?? ""}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Enter your password"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Phone</span>
            <input
              type="tel"
              required
              value={phone ?? ""}
              onChange={(e) => dispatch(setPhone(e.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Enter your phone number"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Address</span>
            <input
              type="text"
              required
              value={address ?? ""}
              onChange={(e) => dispatch(setAddress(e.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Enter your address"
            />
          </label>

          <div className="flex justify-center">
            <Button
              type="submit"
              isLoading={loading}
              className="w-full max-w-xs"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
