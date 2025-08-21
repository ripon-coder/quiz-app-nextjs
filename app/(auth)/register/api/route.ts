
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function POST(request: Request) {
    
  try {
    const registerData = await request.json();
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    // if (!res.ok) {
    //   throw new Error("Failed");
    // }
    const data = await res.json();
    return NextResponse.json(data,{status:res.status});
  } catch (error) {
    console.error("Error in route.ts:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}


