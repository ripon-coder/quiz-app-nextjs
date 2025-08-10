import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // If user has token and tries to access /login, redirect to home
  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Otherwise continue
  return NextResponse.next();
}

// Specify which paths this middleware should run on:
export const config = {
  matcher: ["/login"],
};
