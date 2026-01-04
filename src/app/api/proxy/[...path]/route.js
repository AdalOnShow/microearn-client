import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "GET");
}

export async function POST(request, { params }) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "POST");
}

export async function PATCH(request, { params }) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "PATCH");
}

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "DELETE");
}

async function handleRequest(request, params, method) {
  try {
    const session = await auth();
    
    // Check if params and params.path exist
    if (!params || !params.path) {
      console.error("Proxy error: params.path is undefined", { params });
      return NextResponse.json(
        { success: false, message: "Invalid path parameters" },
        { status: 400 }
      );
    }
    
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
      // SECURITY FIX: Ensure JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        console.error("CRITICAL: JWT_SECRET environment variable is not set");
        return NextResponse.json(
          { success: false, message: "Server configuration error" },
          { status: 500 }
        );
      }

      // Generate a JWT token for the backend
      const jwt = require("jsonwebtoken");
      const token = jwt.sign(
        { 
          id: session.user.id,
        },
        process.env.JWT_SECRET,
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