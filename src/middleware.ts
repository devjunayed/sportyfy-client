/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import {  jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const AuthRoutes = ["/login", "/register"];
const roleBasedRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/],
};

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);


  const cookieStore  = await cookies();
  const token = cookieStore.get("token");
  console.log({token})

  const accessToken =  request.cookies.get("token")?.value;
  console.log({accessToken})

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  }

  if(pathname.startsWith("/booking")){
    return NextResponse.next();
  }

  const jwtData = jwtDecode(accessToken);
  console.log({jwtData})

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path", "/booking/:path", "/login", "/register"],
};
