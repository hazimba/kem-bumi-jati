import { createClient } from "./client";

export const GALERI_TYPES = [] as const;
export const FASILITI_TYPES = [] as const;

// Image types for galeri and fasiliti - fetched from database
export type GaleriType = (typeof GALERI_TYPES)[number];
export type FasilitiType = (typeof FASILITI_TYPES)[number];

export interface ImageRecord {
  id: string;
  url: string;
  filename: string;
  type: GaleriType | FasilitiType;
  category?: string;
  date: string;
  created_at: string;
}

export interface ImageType {
  id: string;
  section: Section;
  slug: string;
  label: string;
  sort_order: number;
  is_active: boolean;
}

export type Section = "faciliti" | "galeri";

// Fetch all image types from database
export async function fetchImageTypes(): Promise<{
  typesBySection: Record<string, ImageType[]>;
  allTypes: ImageType[];
}> {
  const supabase = createClient();
  const { data, error } = await supabase.from("image_types").select("*").order("sort_order", { ascending: true });

  if (error) throw new Error(`Gagal muat turun jenis imej: ${error.message}`);

  // Group by section
  const typesBySection: Record<string, ImageType[]> = {};
  (data as ImageType[]).forEach((item) => {
    if (!typesBySection[item.section]) {
      typesBySection[item.section] = [];
    }
    typesBySection[item.section].push({
      id: item.id,
      slug: item.slug,
      label: item.label,
      sort_order: item.sort_order,
      is_active: item.is_active,
      section: item.section,
    });
  });

  return {
    typesBySection,
    allTypes: data as ImageType[],
  };
}

// Get types for a specific section
export async function getTypesBySection(section: "galeri" | "faciliti"): Promise<ImageType[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("image_types").select("*").eq("section", section).order("sort_order", { ascending: true });

  if (error) throw new Error(`Gagal muat turun jenis ${section}: ${error.message}`);

  return data as ImageType[];
}

export async function getImageTypes(section?: Section) {
  const supabase = createClient();
  let q = supabase.from("image_types").select("*").order("sort_order");
  if (section) q = q.eq("section", section);
  const { data, error } = await q;
  if (error) throw new Error(`Gagal muat jenis imej: ${error.message}`);
  return data as ImageType[];
}

// Create new image type
export async function createImageType(section: "galeri" | "faciliti", slug: string, label: string, sortOrder: number = 0) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("image_types")
    .insert({
      section,
      slug,
      label,
      sort_order: sortOrder,
      is_active: true,
    })
    .select()
    .single();

  if (error) throw new Error(`Gagal mencipta jenis imej: ${error.message}`);

  return data as ImageType;
}

// Update image type (activate/deactivate, reorder)
export async function updateImageType(id: string, updates: { label?: string; sort_order?: number; is_active?: boolean }) {
  const supabase = createClient();

  const { data, error } = await supabase.from("image_types").update(updates).eq("id", id).select().single();

  if (error) throw new Error(`Gagal menggenerate jenis imej: ${error.message}`);

  return data as ImageType;
}

// Delete image type (checks for dependent images first)
export async function deleteImageType(id: string) {
  const supabase = createClient();

  const { count, error: countError } = await supabase.from("site_images").select("id", { count: "exact", head: true }).eq("type_id", id);

  if (countError) throw new Error(`Gagal semak imej: ${countError.message}`);

  if (count && count > 0) {
    throw new Error(`Tidak boleh padam: masih ada ${count} imej menggunakan jenis ini. Sila pindah atau padam imej dahulu.`);
  }

  const { error } = await supabase.from("image_types").delete().eq("id", id);
  if (error) throw new Error(`Gagal padam jenis imej: ${error.message}`);
}

// Upload image to Supabase Storage and save record to database
export async function uploadImage(file: File, type: GaleriType | FasilitiType, category?: string, section?: "galeri" | "fasiliti") {
  const supabase = createClient();

  // Determine section if not provided (default to galeri)
  const effectiveSection = section ?? "galeri";

  // Find the type_id from image_types table
  const { data: typeData, error: typeError } = await supabase
    .from("image_types")
    .select("id, slug")
    .eq("section", effectiveSection)
    .eq("slug", type)
    .maybeSingle();

  if (typeError) throw new Error(`Gagal dapatkan jenis imej: ${typeError.message}`);

  if (!typeData) {
    throw new Error(`Jenis imej "${type}" tidak ditemui dalam database`);
  }

  const fileName = `${effectiveSection}/${typeData.slug}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from("images").upload(fileName, file);

  if (error) throw new Error(`Gagal mengunggah gambar: ${error.message}`);

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(fileName);

  // Save record to database
  const { error: dbError } = await supabase.from("site_images").insert({
    type_id: typeData.id,
    url: publicUrl,
    filename: fileName,
    caption: category,
    sort_order: 0,
    ...(effectiveSection && { storage_path: fileName }),
  });

  if (dbError) throw new Error(`Gagal simpan rekod: ${dbError.message}`);

  return { url: publicUrl, filename: fileName, type, category } as ImageRecord;
}

// Fetch all images from database
export async function fetchImages(type?: GaleriType | FasilitiType, section?: "galeri" | "fasiliti") {
  const supabase = createClient();

  let query = supabase.from("site_images").select(`
    *,
    image_types!inner (section, slug, label)
  `);

  if (type) {
    query = query.eq("site_images.type_id", type);
  }

  if (section) {
    query = query.eq("image_types.section", section);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw new Error(`Gagal muat turun imej: ${error.message}`);

  return data as ImageRecord[];
}

// Delete image from database and storage
export async function deleteImage(id: string, filename: string, type?: GaleriType | FasilitiType, section?: "galeri" | "fasiliti") {
  const supabase = createClient();

  // Delete from storage first
  const { error: storageError } = await supabase.storage.from("images").remove([filename]);

  if (storageError) throw new Error(`Gagal padam dari storage: ${storageError.message}`);

  // Delete from database
  const { error: dbError } = await supabase.from("site_images").delete().eq("id", id);

  if (dbError) throw new Error(`Gagal padam dari database: ${dbError.message}`);

  return { success: true };
}

// Delete all images of a specific type
export async function deleteTypeImages(type: GaleriType | FasilitiType, section: "galeri" | "fasiliti") {
  const supabase = createClient();

  // Fetch all images of this type
  const images = await fetchImages(type, section);

  if (images.length === 0) return { deleted: 0, storageDeleted: 0 };

  // Delete from storage
  const filenames = images.map((img: ImageRecord) => img.filename);
  const { error: storageError } = await supabase.storage.from("images").remove(filenames);

  if (storageError) throw new Error(`Gagal padam dari storage: ${storageError.message}`);

  // Delete from database
  const { error: dbError } = await supabase
    .from("site_images")
    .delete()
    .in(
      "id",
      images.map((img: ImageRecord) => img.id)
    );

  if (dbError) throw new Error(`Gagal padam dari database: ${dbError.message}`);

  return {
    deleted: images.length,
    storageDeleted: filenames.length,
  };
}
