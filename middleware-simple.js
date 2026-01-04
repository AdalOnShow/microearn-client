import { NextResponse } from "next/server";

export function middleware(request) {
  // Simple middleware without external dependencies
  const { pathname } = request.nextUrl;
  
  // Skip for API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};