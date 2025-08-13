import { cookies } from 'next/headers';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export async function fetchOngoingQuiz() {
  const cookieStore = await cookies(); // await here!
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    throw new Error('No auth token found');
  }

  const res = await fetch(`${API_BASE_URL}/user/quizzes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch profile data');

  const json = await res.json();
  return json.data;
}
