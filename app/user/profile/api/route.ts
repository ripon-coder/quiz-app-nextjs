import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// Helper function to get auth token
async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value;
}

// GET endpoint (unchanged)
export async function GET() {
  const token = await getAuthToken(); // <-- add await here
  console.log("Token:", token);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${API_BASE_URL}/user/get-user-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST/PUT endpoint for saving profile
export async function POST(request: Request) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profileData = await request.json();
    const res = await fetch(`${API_BASE_URL}/user/profile-update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    // Try to parse JSON, fallback to text if not JSON
    let backendResponse: any;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      backendResponse = await res.json();
    } else {
      backendResponse = await res.text();
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            backendResponse?.error ||
            backendResponse?.message ||
            backendResponse ||
            "Failed to save profile",
          backendResponse,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(backendResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
