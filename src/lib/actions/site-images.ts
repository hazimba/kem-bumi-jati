import { createClient } from "@/lib/supabase/client";
import type { Section } from "@/lib/actions/image-types";

const BUCKET = "kem_bumi_jati";

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

  if (error) throw new Error(`Gagal muat imej: ${error.message}`);
  return data as SiteImage[];
}

export async function uploadImage(params: { file: File; typeId: string; caption?: string }) {
  const supabase = createClient();
  const { file, typeId, caption } = params;

  const ext = file.name.split(".").pop();
  const storagePath = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, file);
  if (uploadError) throw new Error(`Gagal muat naik fail: ${uploadError.message}`);

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  const { data: row, error: insertError } = await supabase
    .from("site_images")
    .insert({
      url: pub.publicUrl,
      filename: file.name,
      storage_path: storagePath,
      type_id: typeId,
      caption: caption?.trim() || null,
    })
    .select("id")
    .single();

  if (insertError) {
    // don't leave an orphan file in storage
    await supabase.storage.from(BUCKET).remove([storagePath]);
    throw new Error(`Gagal simpan imej: ${insertError.message}`);
  }

  const { data, error } = await supabase.from("site_images_view").select("*").eq("id", row.id).single();

  if (error) throw new Error(`Gagal muat imej: ${error.message}`);
  return data as SiteImage;
}

export async function deleteImage(image: Pick<SiteImage, "id" | "storage_path">) {
  const supabase = createClient();

  const { error } = await supabase.from("site_images").delete().eq("id", image.id);
  if (error) throw new Error(`Gagal padam imej: ${error.message}`);

  await supabase.storage.from(BUCKET).remove([image.storage_path]);
}
