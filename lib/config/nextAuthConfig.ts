import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        type: { label: "Type", type: "text" },
      },
      async authorize(credentials) {
        const user = {
          ...credentials,
          type: credentials?.type,
        };
        return user as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.type = token.type as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.type = user.type;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};