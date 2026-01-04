import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

// Force Node.js runtime (not Edge) because MongoDB driver uses crypto
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { name, email, password, image, role } = await request.json();

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required" },
        { status: 400 }
      );
    }

    if (!["Worker", "Buyer"].includes(role)) {
      return NextResponse.json(
        { error: "Role must be Worker or Buyer" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if user exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Set coins based on role
    const coin = role === "Worker" ? 10 : 50;

    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      image: image || "",
      role,
      coin, // SECURITY FIX: Use consistent field name 'coin' not 'coins'
      provider: "credentials",
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
