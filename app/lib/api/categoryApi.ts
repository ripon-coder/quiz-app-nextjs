// lib/api/categoryApi.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export type CategoryData = {
  id: number;
  title: string;
  content: string;
  img: string;
  video: string;
};

export async function fetchCategoryData(): Promise<CategoryData[]> {
  const res = await fetch(`${API_BASE_URL}/home-category`, {
    next: { revalidate: 3600 } // Revalidate data every hour
  });
  
  if (!res.ok) throw new Error("Failed to fetch category data");
  const json = await res.json();

  if (!json.success || !json.data || !Array.isArray(json.data)) {
    throw new Error("API response structure unexpected");
  }

  return json.data as CategoryData[];
}