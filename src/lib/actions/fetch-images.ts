"use server";

import { getGaleriImages } from "@/lib/quaries/galeri"; // Adjust path to your query function

export async function fetchImagesAction(typeSlug: string, page: number) {
  try {
    const result = await getGaleriImages({ typeSlug, page });
    return result; // Returns { images: [...], hasMore: boolean }
  } catch (error) {
    throw new Error("Failed to fetch more images");
  }
}
