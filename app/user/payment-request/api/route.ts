import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// Helper function to get auth token
async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value;
}

export async function POST(request: Request) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Read profile data from client
    const dataPayment = await request.json();

    // Forward request to backend
    const res = await fetch(`${API_BASE_URL}/user/payment-request`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPayment),
    });

    // Check if backend returned error
    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Failed to sent payment request",
        },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json(res.json());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
