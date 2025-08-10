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
  console.log(json.data);
  return json.data; // adjust based on your API response structure
}
