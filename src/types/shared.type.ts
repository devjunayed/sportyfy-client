import { ReactNode } from "react";

export interface ErrorResponse {
  data?: {
    success: boolean;
    message: string;
  };
  message?: string;
}

export type TUserPath = {
  name?: string;
  icon?: ReactNode;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export interface TUser {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export type TSidebarItem = {
      key?: string;
      icon?: ReactNode;
      path?: string | undefined;
      label: ReactNode;
      children?: TSidebarItem[];
    }
 
    export interface TBooking {
      startTime: string;
      endTime: string;
      user: string;
      facility: string;
      date: string;
      payableAmount: number;
  }
  