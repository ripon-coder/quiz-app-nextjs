// app/api/quiz-start/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/user/next-quiz`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) {
      const text = await res.text(); // safer fallback
      return new Response(text, { status: res.status });
    }

    if (contentType.includes("application/json")) {
      const json = await res.json();
      return NextResponse.json(json);
    } else {
      const text = await res.text();
      return new Response(text, { status: res.status });
    }
  } catch (err: any) {
    return new Response(err.message || "Server Error", { status: 500 });
  }
}
