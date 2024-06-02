import { nextAuthConfig } from "@/lib/config/nextAuthConfig"
import NextAuth from "next-auth/next"

const authHandler = NextAuth(nextAuthConfig)

export { authHandler as GET, authHandler as POST }
