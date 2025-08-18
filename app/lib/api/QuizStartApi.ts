import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export async function QuizStartApi(
  quiz_id: number,
  status: number,
  book_id: any,
  lang: string
) {
  const cookieStore = await cookies(); // await here!
  const token = cookieStore.get("authToken")?.value;
  if (!token) {
    throw new Error("No auth token found");
  }

  const res = await fetch(`${API_BASE_URL}/user/quizzes`, {
    method: "POST",
    body: JSON.stringify({ quiz_id, status, book_id, lang }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch quiz data");

  const json = await res.json();
  return json.data;
}
