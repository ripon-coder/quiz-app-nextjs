import { NextResponse } from "next/server";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function GET() {
  try {
    console.log("Fetching upcoming quiz from API...");
    const res = await fetch(`${API_BASE_URL}/upcoming-quiz`, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("API status:", res.status);

    if (!res.ok) {
      throw new Error("Failed to fetch upcoming quizzes");
    }

    const data = await res.json();
    console.log("Data received:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in route.ts:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
