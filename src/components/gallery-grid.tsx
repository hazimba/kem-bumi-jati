"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "Kemudahan" | "Aktiviti" | "Program" | "Kawasan";
type Filter = "Semua" | Category;
type Photo = { src: string; alt: string; category: Category; ratio: number };

const filters: Filter[] = ["Semua", "Kemudahan", "Aktiviti", "Program", "Kawasan"];

// ratio = width / height. Replace `src` with real photos.
const ph = (w: number, h: number, text: string) => `https://placehold.co/${w}x${h}/png?text=${encodeURIComponent(text)}`;

const photos: Photo[] = [
  { src: ph(600, 500, "Dewan Kuliah"), alt: "Dewan kuliah", category: "Kemudahan", ratio: 1.2 },
  { src: ph(560, 500, "Asrama"), alt: "Asrama", category: "Kemudahan", ratio: 1.12 },
  { src: ph(600, 500, "Dewan Makan"), alt: "Dewan makan", category: "Kemudahan", ratio: 1.2 },
  { src: ph(700, 500, "Kolam Renang"), alt: "Kolam renang", category: "Kemudahan", ratio: 1.4 },
  { src: ph(560, 500, "Obstacle"), alt: "Kawasan obstacle", category: "Aktiviti", ratio: 1.12 },
  { src: ph(560, 500, "Bangunan"), alt: "Bangunan kem", category: "Kawasan", ratio: 1.12 },
  { src: ph(800, 500, "Team Building"), alt: "Program team building", category: "Program", ratio: 1.6 },
  { src: ph(700, 500, "Aktiviti Air"), alt: "Aktiviti air", category: "Aktiviti", ratio: 1.3 },
  { src: ph(400, 500, "Aktiviti"), alt: "Aktiviti berkumpulan", category: "Aktiviti", ratio: 0.8 },
  { src: ph(600, 500, "Dewan"), alt: "Dewan seminar", category: "Kemudahan", ratio: 1.2 },
  { src: ph(600, 500, "Blok Penginapan"), alt: "Blok penginapan", category: "Kawasan", ratio: 1.2 },
  { src: ph(600, 500, "Asrama"), alt: "Asrama", category: "Kemudahan", ratio: 1.2 },
  { src: ph(600, 500, "Obstacle 2"), alt: "Aktiviti obstacle", category: "Aktiviti", ratio: 1.15 },
  { src: ph(600, 500, "Program Kepimpinan"), alt: "Program kepimpinan", category: "Program", ratio: 1.2 },
  { src: ph(600, 500, "Kawasan Lapang"), alt: "Kawasan lapang", category: "Kawasan", ratio: 1.2 },
];

const ROW_HEIGHT = 200; // target row height in px

const GalleryGrid = () => {
  const [active, setActive] = useState<Filter>("Semua");
  const visible = active === "Semua" ? photos : photos.filter((p) => p.category === active);

  return (
    <div>
      <Tabs value={active} onValueChange={(v) => setActive(v as Filter)}>
        <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto overflow-y-hidden bg-transparent p-1 sm:justify-between">
          {filters.map((f) => (
            <TabsTrigger
              key={f}
              value={f}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-foreground/80 shadow-none data-[state=active]:bg-[#1f6b3a] data-[state=active]:text-white data-[state=active]:shadow-none dark:data-[state=active]:bg-[#2a8a4f] dark:data-[state=active]:text-white dark:data-[state=active]:border-transparent">
              {f}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Justified rows: each photo grows according to its aspect ratio */}
      <ul className="mt-5 flex flex-wrap gap-2 after:grow-[100] after:content-[''] sm:gap-3">
        {visible.map(({ src, alt, ratio }) => (
          <li
            key={src}
            className="overflow-hidden rounded-lg shadow-md ring-1 ring-black/5 dark:ring-white/10"
            style={{ flex: `${ratio} 1 ${ratio * ROW_HEIGHT}px` }}>
            <div className="relative w-full" style={{ aspectRatio: ratio }}>
              <Image src={src} alt={alt} fill unoptimized sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
            </div>
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Tiada gambar dalam kategori ini.</p>}
    </div>
  );
};

export default GalleryGrid;
