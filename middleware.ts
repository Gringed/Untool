// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request.url);
  //return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
