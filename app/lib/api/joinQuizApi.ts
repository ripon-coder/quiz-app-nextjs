import { cookies } from 'next/headers';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export async function fetchJoinQuiz(id : number,statusId : number) {
  const cookieStore = await cookies(); // await here!
  const token = cookieStore.get('authToken')?.value;
  if (!token) {
    throw new Error('No auth token found');
  }

  const res = await fetch(`${API_BASE_URL}/user/join-quiz`, {
    method:"POST",
    body: JSON.stringify({ quiz_id:id, status: statusId }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: 'no-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch ongoing quiz data');

  const json = await res.json();
  return json.data;
}
