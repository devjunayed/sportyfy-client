import authOptions from "@/utils/authOptions";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
