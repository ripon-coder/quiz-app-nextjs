const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function fetchCategoryDataByID(id: number) {
  const res = await fetch(`${API_BASE_URL}/content?id=${id}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) throw new Error("Failed to fetch category data");

  const json = await res.json();

  return json.data;
}
