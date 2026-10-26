"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GaleriImage, GaleriType } from "@/lib/quaries/galeri";

const ALL = "semua";

interface Props {
  types: GaleriType[];
  images: GaleriImage[];
}

const GalleryTabs = ({ types, images }: Props) => {
  const [active, setActive] = useState<string>(ALL);

  const visible = active === ALL ? images : images.filter((img) => img.type_slug === active);

  return (
    <div className="space-y-8">
      <Tabs value={active} onValueChange={setActive}>
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
        {visible.map((img) => (
          <div
            key={img.id}
            className="break-inside-avoid overflow-hidden rounded-xl bg-muted transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src={img.url}
              alt={img.caption ?? img.type_label}
              width={800}
              height={600}
              unoptimized
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-[#1f6b3a]">{img.type_label}</p>
              {img.caption && <h3 className="text-sm font-semibold text-foreground">{img.caption}</h3>}
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Tiada gambar dalam kategori ini.</p>}
    </div>
  );
};

export default GalleryTabs;
