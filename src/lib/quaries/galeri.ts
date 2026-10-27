import { createClient } from "@/lib/supabase/server";

export interface GaleriType {
  id: string;
  slug: string;
  label: string;
}

export interface GaleriImage {
  id: string;
  url: string;
  caption: string | null;
  type_id: string;
  type_slug: string;
  type_label: string;
}

const PAGE_SIZE = 12;

export async function getGaleriTypes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("image_types")
    .select("id, slug, label")
    .eq("section", "galeri")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw new Error(error.message);
  return (data ?? []) as GaleriType[];
}

export async function getGaleriImages({ typeSlug, page = 1 }: { typeSlug?: string; page?: number }) {
  const supabase = await createClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("site_images_view")
    .select("id, url, caption, type_id, type_slug, type_label", { count: "exact" })
    .eq("section", "galeri");

  // Filter directly at the database level if a specific tab is selected
  if (typeSlug && typeSlug !== "semua") {
    query = query.eq("type_slug", typeSlug);
  }

  const { data, error, count } = await query
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    images: (data ?? []) as GaleriImage[],
    hasMore: count ? from + PAGE_SIZE < count : false,
  };
}
