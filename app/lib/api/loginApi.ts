const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to login");
  }

  const json = await res.json();
  return json.data; // Should include token and any other data your API returns
}
