import { createClient } from "@/lib/supabase/client";
import { uploadToR2, deleteFromR2 } from "@/lib/r2-storage";

export interface PageBanner {
  id: string;
  page_slug: string;
  page_title: string;
  banner_url: string;
  storage_path: string;
  updated_at?: string;
}

export const DEFAULT_PAGE_BANNERS: Record<string, { page_title: string; default_url: string }> = {
  "hubungi-kami": {
    page_title: "Hubungi Kami",
    default_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000144361.jpg",
  },
  "latar-belakang": {
    page_title: "Latar Belakang",
    default_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000144361.jpg",
  },
  "lokasi-kami": {
    page_title: "Lokasi Kami",
    default_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000211396.jpg",
  },
  fasiliti: {
    page_title: "Fasiliti Utama",
    default_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000211396.jpg",
  },
  galeri: {
    page_title: "Galeri & Aktiviti",
    default_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000144361.jpg",
  },
  // pakej: {
  //   page_title: "Program & Pakej",
  //   default_url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000211396.jpg",
  // },
};

export async function getPageBanners(): Promise<PageBanner[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("page_banners").select("*");

  if (error) {
    console.error("Gagal muat page banners:", error);
    return [];
  }

  return (data as PageBanner[]) || [];
}

export async function getPageBannerBySlug(pageSlug: string, fallbackUrl?: string): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.from("page_banners").select("banner_url").eq("page_slug", pageSlug).maybeSingle();

  if (error || !data?.banner_url) {
    return fallbackUrl || DEFAULT_PAGE_BANNERS[pageSlug]?.default_url || "https://images.kembumijati.com/kem_bumi_jati/default_banner.webp";
  }

  return data.banner_url;
}

export async function updatePageBanner(params: {
  pageSlug: string;
  pageTitle: string;
  file: File;
  currentStoragePath?: string;
}): Promise<PageBanner> {
  const supabase = createClient();
  const { pageSlug, pageTitle, file, currentStoragePath } = params;

  // Upload new banner file to R2 covers/banners folder
  const uploaded = await uploadToR2(file, "covers");

  // If there was a previous R2 image, clean it up
  if (currentStoragePath) {
    try {
      await deleteFromR2(currentStoragePath);
    } catch (cleanupError) {
      console.error("Old banner R2 deletion failed:", cleanupError);
    }
  }

  // Upsert record into page_banners table
  const { data, error } = await supabase
    .from("page_banners")
    .upsert(
      {
        page_slug: pageSlug,
        page_title: pageTitle,
        banner_url: uploaded.url,
        storage_path: uploaded.path,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_slug" }
    )
    .select()
    .single();

  if (error) {
    throw new Error(`Gagal kemaskini banner: ${error.message}`);
  }

  return data as PageBanner;
}
