import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function GET(request, { params }) {
  return handleRequest(request, params, "GET");
}

export async function POST(request, { params }) {
  return handleRequest(request, params, "POST");
}

export async function PATCH(request, { params }) {
  return handleRequest(request, params, "PATCH");
}

export async function DELETE(request, { params }) {
  return handleRequest(request, params, "DELETE");
}

async function handleRequest(request, { params }, method) {
  try {
    const session = await auth();
    const path = params.path.join("/");
    const url = new URL(request.url);
    
    // Forward query parameters
    const searchParams = url.searchParams.toString();
    const backendUrl = `${API_URL}/${path}${searchParams ? `?${searchParams}` : ""}`;

    const headers = {
      "Content-Type": "application/json",
    };

    // Add JWT token if user is authenticated
    if (session?.user) {
      // Generate a JWT token for the backend
      const jwt = require("jsonwebtoken");
      const token = jwt.sign(
        { 
          id: session.user.id,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "1h" }
      );
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
    };

    // Add body for POST/PATCH requests
    if (method === "POST" || method === "PATCH") {
      const body = await request.text();
      if (body) {
        config.body = body;
      }
    }

    const response = await fetch(backendUrl, config);
    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}