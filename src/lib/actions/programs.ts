import { createClient } from "@/lib/supabase/client";
import { uploadToR2, deleteFromR2 } from "@/lib/r2-storage";

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  storage_path: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const FALLBACK_PROGRAMS: ProgramItem[] = [
  {
    id: "fallback-1",
    title: "Trained Nepalese Guard",
    description: "Pengawal keselamatan berpengalaman dan terlatih untuk memastikan keselamatan peserta.",
    image_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000211396.jpg",
    storage_path: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "fallback-2",
    title: "Team Building",
    description: "Kursus, latihan organisasi dan aktiviti kumpulan.",
    image_url: "https://placehold.co/1600x500/png?text=Team+Building",
    storage_path: null,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "fallback-3",
    title: "Motivasi & Kepimpinan",
    description: "Program pembangunan diri dan kepimpinan.",
    image_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/IMG_20260803_142041.jpg",
    storage_path: null,
    sort_order: 3,
    is_active: true,
  },
  {
    id: "fallback-4",
    title: "Kem Kepimpinan & Jati Diri",
    description: "Program pembangunan diri dan kepimpinan untuk remaja dan belia.",
    image_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000144361.jpg",
    storage_path: null,
    sort_order: 4,
    is_active: true,
  },
  {
    id: "fallback-5",
    title: "Kem Smart Solat",
    description: "Program pembangunan diri dan kepimpinan untuk remaja dan belia.",
    image_url: "https://placehold.co/1600x500/png?text=Kem+Smart+Solat",
    storage_path: null,
    sort_order: 5,
    is_active: true,
  },
  {
    id: "fallback-6",
    title: "Kem Akademik Skor SPM",
    description: "Program pembangunan diri dan kepimpinan untuk remaja dan belia.",
    image_url: "https://placehold.co/1600x500/png?text=Kem+Akademik+Skor+SPM",
    storage_path: null,
    sort_order: 6,
    is_active: true,
  },
  {
    id: "fallback-7",
    title: "Kem Perkhemahan",
    description: "Program akademik untuk pelajar SPM.",
    image_url: "https://placehold.co/1600x500/png?text=Kem+Perkhemahan",
    storage_path: null,
    sort_order: 7,
    is_active: true,
  },
  {
    id: "fallback-8",
    title: "Program Ai & Sahsiah Diri",
    description: "Program akademik untuk pelajar SPM.",
    image_url: "https://placehold.co/1600x500/png?text=Program+Ai+&+Sahsiah+Diri",
    storage_path: null,
    sort_order: 8,
    is_active: true,
  },
];

export async function getPrograms(): Promise<ProgramItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return FALLBACK_PROGRAMS;
  }

  return data as ProgramItem[];
}

export async function getAllProgramsAdmin(): Promise<ProgramItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Gagal muat senarai program:", error);
    return [];
  }

  return (data as ProgramItem[]) || [];
}

export async function createProgram(params: {
  title: string;
  description: string;
  file?: File | null;
  imageUrl?: string;
}): Promise<ProgramItem> {
  const supabase = createClient();
  let imageUrl = params.imageUrl || "https://placehold.co/1600x500/png?text=Program";
  let storagePath: string | null = null;

  if (params.file) {
    const uploaded = await uploadToR2(params.file, "covers");
    imageUrl = uploaded.url;
    storagePath = uploaded.path;
  }

  // Get max sort_order
  const { data: last } = await supabase
    .from("programs")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = (last?.sort_order ?? 0) + 1;

  const { data, error } = await supabase
    .from("programs")
    .insert({
      title: params.title.trim(),
      description: params.description.trim(),
      image_url: imageUrl,
      storage_path: storagePath,
      sort_order: nextOrder,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    if (storagePath) {
      await deleteFromR2(storagePath).catch(() => {});
    }
    throw new Error(`Gagal cipta program: ${error.message}`);
  }

  return data as ProgramItem;
}

export async function updateProgram(params: {
  id: string;
  title: string;
  description: string;
  file?: File | null;
  imageUrl?: string;
  currentStoragePath?: string | null;
  isActive?: boolean;
}): Promise<ProgramItem> {
  const supabase = createClient();
  let imageUrl = params.imageUrl;
  let storagePath = params.currentStoragePath;

  if (params.file) {
    const uploaded = await uploadToR2(params.file, "covers");
    imageUrl = uploaded.url;
    storagePath = uploaded.path;

    if (params.currentStoragePath) {
      await deleteFromR2(params.currentStoragePath).catch(() => {});
    }
  }

  const updates: any = {
    title: params.title.trim(),
    description: params.description.trim(),
    updated_at: new Date().toISOString(),
  };

  if (imageUrl !== undefined) updates.image_url = imageUrl;
  if (storagePath !== undefined) updates.storage_path = storagePath;
  if (params.isActive !== undefined) updates.is_active = params.isActive;

  const { data, error } = await supabase
    .from("programs")
    .update(updates)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Gagal kemaskini program: ${error.message}`);
  }

  return data as ProgramItem;
}

export async function deleteProgram(id: string, storagePath?: string | null): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("programs").delete().eq("id", id);

  if (error) {
    throw new Error(`Gagal padam program: ${error.message}`);
  }

  if (storagePath) {
    await deleteFromR2(storagePath).catch(() => {});
  }
}

export async function toggleProgramStatus(id: string, isActive: boolean): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("programs")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal tukar status: ${error.message}`);
  }
}
