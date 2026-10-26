import { createClient } from "../supabase/client";

export type Section = "faciliti" | "galeri";

export interface ImageType {
  id: string;
  section: Section;
  slug: string;
  label: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  cover_url: string | null;
  cover_path: string | null;
}

const BUCKET = "kem_bumi_jati";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function getImageTypes(section?: Section) {
  const supabase = createClient();
  let q = supabase.from("image_types").select("*").order("sort_order");
  if (section) q = q.eq("section", section);
  const { data, error } = await q;
  if (error) throw new Error(`Gagal muat jenis imej: ${error.message}`);
  return data as ImageType[];
}

async function uploadCover(file: File) {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const path = `covers/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw new Error(`Gagal muat naik cover: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

async function removeCoverFile(path: string | null) {
  if (!path) return;
  await createClient().storage.from(BUCKET).remove([path]);
}

export async function createImageType(section: Section, label: string, cover?: File | null) {
  const supabase = createClient();

  const { data: last } = await supabase
    .from("image_types")
    .select("sort_order")
    .eq("section", section)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const uploaded = cover ? await uploadCover(cover) : null;

  const { data, error } = await supabase
    .from("image_types")
    .insert({
      section,
      label: label.trim(),
      slug: slugify(label),
      sort_order: (last?.sort_order ?? 0) + 1,
      cover_url: uploaded?.url ?? null,
      cover_path: uploaded?.path ?? null,
    })
    .select()
    .single();

  if (error) {
    await removeCoverFile(uploaded?.path ?? null); // no orphan file
    if (error.code === "23505") throw new Error("Jenis ini sudah wujud dalam seksyen ini.");
    throw new Error(`Gagal cipta jenis imej: ${error.message}`);
  }
  return data as ImageType;
}

export async function setImageTypeCover(type: Pick<ImageType, "id" | "cover_path">, file: File) {
  const supabase = createClient();
  const uploaded = await uploadCover(file);

  const { error } = await supabase.from("image_types").update({ cover_url: uploaded.url, cover_path: uploaded.path }).eq("id", type.id);

  if (error) {
    await removeCoverFile(uploaded.path);
    throw new Error(`Gagal kemas kini cover: ${error.message}`);
  }
  await removeCoverFile(type.cover_path); // remove the old one only after success
}

export async function updateImageType(id: string, updates: { label?: string; sort_order?: number; is_active?: boolean }) {
  const supabase = createClient();

  const { data, error } = await supabase.from("image_types").update(updates).eq("id", id).select().single();

  if (error) throw new Error(`Gagal menggenerate jenis imej: ${error.message}`);

  return data as ImageType;
}

export async function deleteImageType(id: string) {
  const supabase = createClient();

  const { data: row } = await supabase.from("image_types").select("cover_path").eq("id", id).single();

  await removeCoverFile(row?.cover_path ?? null);

  const { count, error: countError } = await supabase.from("site_images").select("id", { count: "exact", head: true }).eq("type_id", id);

  if (countError) throw new Error(`Gagal semak imej: ${countError.message}`);

  if (count && count > 0) {
    throw new Error(`Tidak boleh padam: masih ada ${count} imej menggunakan jenis ini. Sila pindah atau padam imej dahulu.`);
  }

  const { error } = await supabase.from("image_types").delete().eq("id", id);
  if (error) throw new Error(`Gagal padam jenis imej: ${error.message}`);
}

// in updateImageType, change the message to:
// `Gagal kemas kini jenis imej: ${error.message}`
