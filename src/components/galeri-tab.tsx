"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GaleriImage, GaleriType } from "@/lib/quaries/galeri";
import { fetchImagesAction } from "@/lib/actions/fetch-images";

const ALL = "semua";

interface Props {
  types: GaleriType[];
  initialImages: GaleriImage[];
  initialHasMore: boolean;
}

const GalleryTabs = ({ types, initialImages, initialHasMore }: Props) => {
  const [active, setActive] = useState<string>(ALL);
  const [images, setImages] = useState<GaleriImage[]>(initialImages);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();

  // Handle tab switching by fetching fresh data for that category
  const handleTabChange = (slug: string) => {
    setActive(slug);
    setPage(1);

    startTransition(async () => {
      // Create a Server Action or fetch endpoint to grab images for the chosen tab
      const res = await fetchImagesAction(slug, 1);
      setImages(res.images);
      setHasMore(res.hasMore);
    });
  };

  const loadMore = () => {
    const nextPage = page + 1;
    startTransition(async () => {
      const res = await fetchImagesAction(active, nextPage);
      setImages((prev) => [...prev, ...res.images]);
      setPage(nextPage);
      setHasMore(res.hasMore);
    });
  };

  return (
    <div className="space-y-8">
      <Tabs value={active} onValueChange={handleTabChange}>
        <TabsList className="inline-flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
          {[{ slug: ALL, label: "Semua" }, ...types].map((t) => (
            <TabsTrigger
              key={t.slug}
              value={t.slug}
              className="rounded-full border border-border px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-[#1f6b3a] data-[state=active]:text-white data-[state=active]:shadow-md">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {images.map((img, index) => {
          const isPriority = index < 3;
          return (
            <div
              key={img.id}
              className="break-inside-avoid overflow-hidden rounded-xl bg-muted transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src={img.url}
                alt={img.caption ?? img.type_label}
                width={800}
                height={600}
                priority={isPriority}
                loading={isPriority ? "eager" : "lazy"}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-[#1f6b3a]">{img.type_label}</p>
                {img.caption && <h3 className="text-sm font-semibold text-foreground">{img.caption}</h3>}
              </div>
            </div>
          );
        })}
      </div>

      {images.length === 0 && !isPending && (
        <p className="py-10 text-center text-sm text-muted-foreground">Tiada gambar dalam kategori ini.</p>
      )}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={isPending}
            className="rounded-lg bg-[#1f6b3a] px-6 py-2 text-sm font-medium text-white shadow transition-opacity hover:opacity-90 disabled:opacity-50">
            {isPending ? "Memuatkan..." : "Muat Lagi"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryTabs;
