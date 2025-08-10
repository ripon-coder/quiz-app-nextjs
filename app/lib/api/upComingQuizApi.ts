const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function fetchUpcomingQuiz() {
  const res = await fetch(`${API_BASE_URL}/upcoming-quiz`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) throw new Error("Failed to fetch upcoming  quiz data");

  const json = await res.json();
  return json.data;
}
