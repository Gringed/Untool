import NextAuth, { getServerSession } from "next-auth";
import { authConfig } from "../next.config";
import { NextResponse } from "next/server";

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
