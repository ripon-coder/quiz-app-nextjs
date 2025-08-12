// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // If no token and trying to access a protected page
  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/upcoming-quizzes") ||
      request.nextUrl.pathname.startsWith("/ongoing-quizzes") ||
      request.nextUrl.pathname.startsWith("/join-quiz"))
  ) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists and trying to visit login/register — redirect to home
  if (token && ["/login", "/register"].includes(request.nextUrl.pathname)) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ongoing-quizzess", "/upcoming-quizzes","/join-quiz", "/login", "/register"], // paths to protect/redirect
};