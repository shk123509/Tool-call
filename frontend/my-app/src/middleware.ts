import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/sign-up" ||
    path === "/verify-code";

  const token = request.cookies.get("token")?.value;

  // 🔐 Logged-in user should not access public pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/chatbot", request.url));
  }

  // 🔐 Not logged-in user should not access private pages
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  // ✅ VERY IMPORTANT
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chatbot",
    "/features",
    "/login",
    "/sign-up",
    "/verify-code",
  ],
};
