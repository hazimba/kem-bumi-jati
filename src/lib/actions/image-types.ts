import { createClient } from "../supabase/client";
import { uploadToR2, deleteFromR2 } from "@/lib/r2-storage";

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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function uploadCover(file: File) {
  const uploaded = await uploadToR2(file, "covers");

  return {
    url: uploaded.url,
    path: uploaded.path,
  };
}

async function removeCoverFile(path: string | null) {
  if (!path) return;
  await deleteFromR2(path);
}

export async function getImageTypes(section?: Section) {
  const supabase = createClient();

  let q = supabase.from("image_types").select("*").order("sort_order");

  if (section) {
    q = q.eq("section", section);
  }

  const { data, error } = await q;

  if (error) {
    throw new Error(`Gagal muat jenis imej: ${error.message}`);
  }

  return data as ImageType[];
}

export async function createImageType(section: Section, label: string, cover?: File | null) {
  const supabase = createClient();

  const { data: last, error: orderError } = await supabase
    .from("image_types")
    .select("sort_order")
    .eq("section", section)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (orderError) {
    throw new Error(`Gagal semak susunan: ${orderError.message}`);
  }

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
    if (uploaded) {
      try {
        await removeCoverFile(uploaded.path);
      } catch (cleanupError) {
        console.error("Cover cleanup failed:", cleanupError);
      }
    }

    if (error.code === "23505") {
      throw new Error("Jenis ini sudah wujud dalam seksyen ini.");
    }

    throw new Error(`Gagal cipta jenis imej: ${error.message}`);
  }

  return data as ImageType;
}

export async function setImageTypeCover(type: Pick<ImageType, "id" | "cover_path">, file: File) {
  const supabase = createClient();
  const uploaded = await uploadCover(file);

  const { data, error } = await supabase
    .from("image_types")
    .update({
      cover_url: uploaded.url,
      cover_path: uploaded.path,
    })
    .eq("id", type.id)
    .select("id");

  if (error || !data?.length) {
    await removeCoverFile(uploaded.path);

    throw new Error(`Gagal kemas kini cover: ${error?.message ?? "Rekod tidak dijumpai"}`);
  }

  // Only remove the previous cover after a successful update.
  if (type.cover_path && type.cover_path !== uploaded.path) {
    await removeCoverFile(type.cover_path);
  }
}

export async function updateImageType(
  id: string,
  updates: {
    label?: string;
    sort_order?: number;
    is_active?: boolean;
  }
) {
  const supabase = createClient();

  const { data, error } = await supabase.from("image_types").update(updates).eq("id", id).select().single();

  if (error) {
    throw new Error(`Gagal kemas kini jenis imej: ${error.message}`);
  }

  return data as ImageType;
}

export async function deleteImageType(id: string) {
  const supabase = createClient();

  const { count, error: countError } = await supabase.from("site_images").select("id", { count: "exact", head: true }).eq("type_id", id);

  if (countError) {
    throw new Error(`Gagal semak imej: ${countError.message}`);
  }

  if (count && count > 0) {
    throw new Error(`Tidak boleh padam: masih ada ${count} imej menggunakan jenis ini. Sila pindah atau padam imej dahulu.`);
  }

  const { data: row, error: fetchError } = await supabase.from("image_types").select("cover_path").eq("id", id).single();

  if (fetchError) {
    throw new Error(`Gagal muat jenis imej: ${fetchError.message}`);
  }

  const { data: deleted, error } = await supabase.from("image_types").delete().eq("id", id).select("id");

  if (error || !deleted?.length) {
    throw new Error(`Gagal padam jenis imej: ${error?.message ?? "Tiada kebenaran"}`);
  }

  if (row.cover_path) {
    await removeCoverFile(row.cover_path);
  }
}
