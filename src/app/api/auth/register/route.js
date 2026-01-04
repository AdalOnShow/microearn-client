import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

// Force Node.js runtime (not Edge) because MongoDB driver uses crypto
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { name, email, password, image, role } = await request.json();

    // VALIDATION FIX: Enhanced input validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required" },
        { status: 400 }
      );
    }

    // VALIDATION FIX: Validate name
    const cleanName = name.trim();
    if (cleanName.length < 2 || cleanName.length > 50) {
      return NextResponse.json(
        { error: "Name must be between 2 and 50 characters" },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z\s'-]+$/.test(cleanName)) {
      return NextResponse.json(
        { error: "Name can only contain letters, spaces, hyphens, and apostrophes" },
        { status: 400 }
      );
    }

    // VALIDATION FIX: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.toLowerCase().trim();
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // VALIDATION FIX: Enhanced password validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        { error: "Password cannot exceed 128 characters" },
        { status: 400 }
      );
    }

    // VALIDATION FIX: Validate role
    if (!["Worker", "Buyer"].includes(role)) {
      return NextResponse.json(
        { error: "Role must be either 'Worker' or 'Buyer'" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if user exists
    const existingUser = await db.collection("users").findOne({ email: cleanEmail });
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
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      image: image ? image.trim() : "",
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
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
