"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import {
  getPageBanners,
  updatePageBanner,
  DEFAULT_PAGE_BANNERS,
  type PageBanner,
} from "@/lib/actions/page-banners";

export default function AdminBannerPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [banners, setBanners] = useState<Record<string, PageBanner>>({});
  const [loading, setLoading] = useState(true);
  const [uploadingSlug, setUploadingSlug] = useState<string | null>(null);

  const loadBanners = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPageBanners();
      const map: Record<string, PageBanner> = {};
      data.forEach((b) => {
        map[b.page_slug] = b;
      });
      setBanners(map);
    } catch (e: any) {
      toast.error(e.message || "Gagal muat senarai banner");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && !localStorage.getItem("admin_auth")) {
      router.push("/login");
      return;
    }
    loadBanners();
  }, [router, loadBanners]);

  const handleImageChange = async (pageSlug: string, pageTitle: string, file: File) => {
    setUploadingSlug(pageSlug);
    try {
      const current = banners[pageSlug];
      const updated = await updatePageBanner({
        pageSlug,
        pageTitle,
        file,
        currentStoragePath: current?.storage_path,
      });

      setBanners((prev) => ({
        ...prev,
        [pageSlug]: updated,
      }));

      toast.success(`Banner bagi halaman "${pageTitle}" telah dikemaskini!`);
    } catch (e: any) {
      toast.error(e.message || "Gagal memuat naik banner");
    } finally {
      setUploadingSlug(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-2 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" /> Kembali ke Dashboard
            </Link>
            <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Pengurusan Banner Halaman
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Muat naik dan tukar imej banner bagi setiap halaman utama. Imej akan dioptimumkan ke WebP dan disimpan di Cloudflare R2.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-dark" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(DEFAULT_PAGE_BANNERS).map(([slug, info]) => {
              const currentBanner = banners[slug];
              const bannerUrl = currentBanner?.banner_url || info.default_url;
              const isUploading = uploadingSlug === slug;

              return (
                <Card key={slug} className="overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <div className="relative aspect-[16/6] bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    {bannerUrl ? (
                      <Image
                        src={bannerUrl}
                        alt={info.page_title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-neutral-400">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span className="text-sm font-medium">Memproses & Muat Naik...</span>
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg font-serif">{info.page_title}</CardTitle>
                    <CardDescription className="text-xs">
                      Slug: <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">{slug}</code>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <label className="block w-full">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isUploading}
                        className="w-full relative cursor-pointer flex items-center justify-center gap-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-brand-dark">
                        <Upload className="h-4 w-4" />
                        <span>Tukar Banner</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                          disabled={isUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageChange(slug, info.page_title, file);
                            }
                          }}
                        />
                      </Button>
                    </label>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
