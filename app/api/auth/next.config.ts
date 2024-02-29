import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Email from "next-auth/providers/email";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Email({
      from: process.env.EMAIL_FROM,
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      console.log(session);
      return session;
    },
    redirect({ url, baseUrl }) {
      console.log(url);
      return baseUrl;
    },
  },
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
