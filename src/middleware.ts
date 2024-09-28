import { NextResponse, NextRequest } from "next/server";
import { getCookie } from "./lib/server-actions";
import { getUser } from "./lib/server-actions/user";

export const config = {
  matcher: [
    '/account',
    '/account/:path*',
    '/cart',
    '/cart/:path*',
    '/checkout',
    '/checkout/:path*'
  ],
}

export const middleware = async (req: NextRequest) => {
  const token = await getCookie("token");

  if (!token?.value) { 
    const url = req.nextUrl.pathname;

    return NextResponse.redirect(new URL(`/sign-in?redirect=${url}`, req.url));
  }

  const data = await getUser();

  if (data.statusCode === 401) { 
    const url = req.nextUrl.pathname;

    return NextResponse.redirect(new URL(`/sign-in?redirect=${url}`, req.url));
  }
}