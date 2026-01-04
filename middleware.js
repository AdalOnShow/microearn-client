import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { nextUrl } = req;
  
  // SECURITY FIX: Ensure AUTH_SECRET is set
  if (!process.env.AUTH_SECRET) {
    console.error("CRITICAL: AUTH_SECRET environment variable is not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }
  
  // Get the token without database access (JWT only)
  const token = await getToken({ 
    req, 
    secret: process.env.AUTH_SECRET 
  });
  
  const isAuthenticated = !!token;

  // Protected routes - require authentication
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Auth routes - redirect if already authenticated
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
