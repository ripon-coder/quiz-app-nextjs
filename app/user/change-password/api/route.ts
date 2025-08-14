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
    const res = await fetch(`${API_BASE_URL}/user/change-password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password: dataPayment.newPassword, password_confirmation: dataPayment.confirmPassword}),
    });

    // Handle backend response
    let backendResponse: any;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      backendResponse = await res.json();
    } else {
      backendResponse = await res.text();
      // Wrap text in object so frontend always receives JSON
      backendResponse = { message: backendResponse };
    }

    // Check if backend returned error
    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            backendResponse?.error ||
            backendResponse?.message ||
            "Failed to change password",
          backendResponse,
        },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json(backendResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
