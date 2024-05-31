import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      type: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    type: string;
  }
  
  interface JWT {
    type: string;
  }
}
