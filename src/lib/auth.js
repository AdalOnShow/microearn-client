import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getDb } from "./mongodb";

// SECURITY FIX: Ensure AUTH_SECRET is set
if (!process.env.AUTH_SECRET) {
  throw new Error("CRITICAL: AUTH_SECRET environment variable is not set in .env.local");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const db = await getDb();
          const user = await db.collection("users").findOne({
            email: credentials.email.toLowerCase().trim(),
          });

          if (!user) {
            return null;
          }

          // Check if user has a password (might be Google-only user)
          if (!user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            coins: user.coin || 0,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const db = await getDb();
          const existingUser = await db.collection("users").findOne({
            email: user.email,
          });

          if (!existingUser) {
            await db.collection("users").insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              role: "Worker",
              coin: 10,
              provider: "google",
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Google sign in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.coins = user.coins;
      }

      // Always fetch fresh user data from DB on token refresh
      if (token.email) {
        try {
          const db = await getDb();
          const dbUser = await db.collection("users").findOne({
            email: token.email,
          });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role;
            token.coins = dbUser.coin || 0;
            token.name = dbUser.name;
            token.picture = dbUser.image;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      // Handle session updates
      if (trigger === "update" && session) {
        if (session.coins !== undefined) token.coins = session.coins;
        if (session.role !== undefined) token.role = session.role;
        if (session.name !== undefined) token.name = session.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.coins = token.coins;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
});
