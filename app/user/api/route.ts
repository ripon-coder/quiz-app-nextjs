import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// Get auth token from cookies
async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value;
}

export async function GET() {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`${API_BASE_URL}/user/user-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch profile");
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

export async function POST(request: Request) {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append("image", file);

    const res = await fetch(`${API_BASE_URL}/user/image-upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: backendFormData,
    });

    // Safe parsing
    const resText = await res.text();
    let backendResponse: any;
    try {
      backendResponse = resText ? JSON.parse(resText) : {};
    } catch {
      backendResponse = { message: resText || "No response from server" };
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          error: backendResponse?.error || backendResponse?.message || "Upload failed",
          backendResponse,
        },
        { status: 500 }
      );
    }

    // Ensure backend returns updated image name
    return NextResponse.json(backendResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
