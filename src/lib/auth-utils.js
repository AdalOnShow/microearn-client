import { auth } from "./auth";
import { redirect } from "next/navigation";

/**
 * Server-side function to require authentication
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }
  
  return session;
}

/**
 * Server-side function to require specific role(s)
 * Redirects to appropriate dashboard if role doesn't match
 */
export async function requireRole(allowedRoles) {
  const session = await requireAuth();
  
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/dashboard");
  }
  
  return session;
}

/**
 * Server-side function to get session without redirect
 * Returns null if not authenticated
 */
export async function getSession() {
  return await auth();
}