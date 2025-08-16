
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function GET() {
  try {
    const res = await fetch(`${API_BASE_URL}/upcoming-quiz`, {
      headers: { "Content-Type": "application/json" },
       cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch upcoming quizzes");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in route.ts:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}


