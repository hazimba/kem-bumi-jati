import { createClient } from "@/lib/supabase/client";
import type { Section } from "@/lib/actions/image-types";
import { uploadToR2, deleteFromR2 } from "@/lib/r2-storage";

export interface SiteImage {
  id: string;
  url: string;
  filename: string;
  storage_path: string;
  caption: string | null;
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

export async function uploadImage(params: { file: File; typeId: string; caption?: string }) {
  const supabase = createClient();
  const { file, typeId, caption } = params;

  const uploaded = await uploadToR2(file, "images");

  const { data: row, error: insertError } = await supabase
    .from("site_images")
    .insert({
      url: uploaded.url,
      filename: file.name,
      storage_path: uploaded.path,
      type_id: typeId,
      caption: caption?.trim() || null,
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

export async function deleteImage(image: Pick<SiteImage, "id" | "storage_path">) {
  const supabase = createClient();

  // Remove database row first.
  const { data, error } = await supabase.from("site_images").delete().eq("id", image.id).select("id");

  if (error) {
    throw new Error(`Gagal padam imej: ${error.message}`);
  }

  if (!data?.length) {
    throw new Error("Imej tidak dijumpai atau tiada kebenaran.");
  }

  // Remove the corresponding object from R2.
  await deleteFromR2(image.storage_path);
}
