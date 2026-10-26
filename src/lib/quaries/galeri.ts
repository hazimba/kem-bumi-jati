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

export async function getGaleri() {
  const supabase = await createClient();

  const [typesRes, imagesRes] = await Promise.all([
    supabase.from("image_types").select("id, slug, label").eq("section", "galeri").eq("is_active", true).order("sort_order"),
    supabase
      .from("site_images_view")
      .select("id, url, caption, type_id, type_slug, type_label")
      .eq("section", "galeri")
      .order("sort_order")
      .order("created_at", { ascending: false }),
  ]);

  if (typesRes.error) throw new Error(typesRes.error.message);
  if (imagesRes.error) throw new Error(imagesRes.error.message);

  const types = (typesRes.data ?? []) as GaleriType[];
  const activeIds = new Set(types.map((t) => t.id));

  // drop images that belong to deactivated types
  const images = ((imagesRes.data ?? []) as GaleriImage[]).filter((i) => activeIds.has(i.type_id));

  return { types, images };
}
