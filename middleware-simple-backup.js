import { NextResponse } from "next/server";

export function middleware(request) {
  // Very simple middleware - just pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};