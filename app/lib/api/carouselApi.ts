const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export type CarouselImage = {
  id: number;
  title: string;
  image: string;
  status: number;
  created_at: string;
  updated_at: string;
};

export async function fetchCarouselImages(): Promise<CarouselImage[]> {
  const res = await fetch(`${API_BASE_URL}/page/slider`);
  if (!res.ok) throw new Error("Failed to fetch carousel images");
  const json = await res.json();

  if (!json.success || !json.data || !Array.isArray(json.data.slider)) {
    throw new Error("API response structure unexpected");
  }

  return json.data.slider as CarouselImage[];
}
