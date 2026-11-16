import { createClient } from "@/lib/supabase/client";
import type { Section } from "@/lib/actions/image-types";
import { uploadToR2, deleteFromR2 } from "@/lib/r2-storage";

export interface SiteImage {
  id: string;
  url: string;
  filename: string;
  storage_path: string;
  caption: string | null;
  description: string | null;
  sort_order: number;
  image_date: string;
  created_at: string;
  type_id: string;
  section: Section;
  type_slug: string;
  type_label: string;
}

export async function getImages() {
  const supabase = createClient();

  const { data, error } = await supabase.from("site_images_view").select("*").order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Gagal muat imej: ${error.message}`);
  }

  return data as SiteImage[];
}

export async function uploadImage(params: { file: File; typeId: string; caption?: string; description?: string }) {
  const supabase = createClient();
  const { file, typeId, caption, description } = params;

  const uploaded = await uploadToR2(file, "images");

  const { data: row, error: insertError } = await supabase
    .from("site_images")
    .insert({
      url: uploaded.url,
      filename: file.name,
      storage_path: uploaded.path,
      type_id: typeId,
      caption: caption?.trim() || null,
      description: description?.trim() || null,
    })
    .select("id")
    .single();

  if (insertError) {
    try {
      await deleteFromR2(uploaded.path);
    } catch (cleanupError) {
      console.error("R2 upload cleanup failed:", cleanupError);
    }

    throw new Error(`Gagal simpan imej: ${insertError.message}`);
  }

  const { data, error } = await supabase.from("site_images_view").select("*").eq("id", row.id).single();

  if (error) {
    throw new Error(`Gagal muat imej: ${error.message}`);
  }

  return data as SiteImage;
}

export async function uploadImages(params: { files: File[]; typeId: string; caption?: string; description?: string }) {
  const supabase = createClient();
  const { files, typeId, caption, description } = params;

  if (!files.length) return [];

  const uploadedResults: Array<{ url: string; path: string; file: File }> = [];

  try {
    for (const file of files) {
      const uploaded = await uploadToR2(file, "images");
      uploadedResults.push({ url: uploaded.url, path: uploaded.path, file });
    }

    const payload = uploadedResults.map((item, index) => ({
      url: item.url,
      filename: item.file.name,
      storage_path: item.path,
      type_id: typeId,
      caption: caption?.trim() || null,
      description: description?.trim() || null,
      sort_order: index,
    }));

    const { data: insertedRows, error: insertError } = await supabase
      .from("site_images")
      .insert(payload)
      .select("id");

    if (insertError) {
      throw new Error(`Gagal simpan imej: ${insertError.message}`);
    }

    const insertedIds = (insertedRows ?? []).map((r) => r.id);
    const { data, error } = await supabase.from("site_images_view").select("*").in("id", insertedIds);

    if (error) {
      throw new Error(`Gagal muat imej: ${error.message}`);
    }

    return data as SiteImage[];
  } catch (err) {
    for (const item of uploadedResults) {
      try {
        await deleteFromR2(item.path);
      } catch (cleanupError) {
        console.error("R2 upload cleanup failed:", cleanupError);
      }
    }
    throw err;
  }
}

export async function deleteImage(image: Pick<SiteImage, "id" | "storage_path">) {
  const supabase = createClient();

  const { data, error } = await supabase.from("site_images").delete().eq("id", image.id).select("id");

  if (error) {
    throw new Error(`Gagal padam imej: ${error.message}`);
  }

  if (!data?.length) {
    throw new Error("Imej tidak dijumpai atau tiada kebenaran.");
  }

  await deleteFromR2(image.storage_path);
}

export async function deleteImages(images: Array<Pick<SiteImage, "id" | "storage_path">>) {
  if (!images.length) return;
  for (const img of images) {
    await deleteImage(img);
  }
}
