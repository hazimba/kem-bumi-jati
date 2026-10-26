import { createClient } from "@/lib/supabase/server";

export interface PublicType {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  cover: string | null;
  count: number;
  cover_url: string | null;
}

export interface PublicImage {
  id: string;
  url: string;
  filename: string;
  caption: string | null;
}

export async function getFacilityTypes(): Promise<PublicType[]> {
  const supabase = await createClient();

  const [{ data: types, error: typesError }, { data: images, error: imagesError }] = await Promise.all([
    supabase
      .from("image_types")
      .select("id, slug, label, description, cover_url")
      .eq("section", "faciliti")
      .eq("is_active", true)
      .order("sort_order"),
    supabase
      .from("site_images_view")
      .select("type_id, url")
      .eq("section", "faciliti")
      .order("sort_order")
      .order("created_at", { ascending: false }),
  ]);

  if (typesError) throw new Error(typesError.message);
  if (imagesError) throw new Error(imagesError.message);

  return (types ?? []).map((t) => {
    const own = (images ?? []).filter((i) => i.type_id === t.id);
    return { ...t, cover: own[0]?.url ?? null, count: own.length };
  });
}

export async function getFacilityType(slug: string) {
  const supabase = await createClient();

  const { data: type } = await supabase
    .from("image_types")
    .select("id, slug, label, description")
    .eq("section", "faciliti")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!type) return null;

  const { data: images, error } = await supabase
    .from("site_images")
    .select("id, url, filename, caption")
    .eq("type_id", type.id)
    .order("sort_order")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return { type, images: (images ?? []) as PublicImage[] };
}
