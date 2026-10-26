"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, Plus, Upload, Trash2, Search } from "lucide-react";
import Image from "next/image";

const mockImages = [
  {
    id: 1,
    src: "https://placehold.co/800x500/png?text=Dewan+Kuliah",
    alt: "Dewan Kuliah",
    category: "Fasiliti",
    date: "2024-01-15",
  },
  {
    id: 2,
    src: "https://placehold.co/800x500/png?text=Asrama",
    alt: "Asrama",
    category: "Fasiliti",
    date: "2024-01-14",
  },
  {
    id: 3,
    src: "https://placehold.co/800x500/png?text=Team+Building",
    alt: "Team Building",
    category: "Aktiviti",
    date: "2024-01-10",
  },
  {
    id: 4,
    src: "https://placehold.co/800x500/png?text=Kolam+Renang",
    alt: "Kolam Renang",
    category: "Fasiliti",
    date: "2024-01-08",
  },
  {
    id: 5,
    src: "https://placehold.co/800x500/png?text=Surau",
    alt: "Surau",
    category: "Fasiliti",
    date: "2024-01-05",
  },
  {
    id: 6,
    src: "https://placehold.co/800x500/png?text=Obstacle+Course",
    alt: "Obstacle Course",
    category: "Aktiviti",
    date: "2024-01-03",
  },
];

const AdminGallery = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && !localStorage.getItem("admin_auth")) {
      router.push("/login");
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-dark">Kelola Galeri</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">Muat naik dan urus foto galeri</p>
          </div>
          <Button className="gap-2 bg-brand-dark hover:bg-brand-dark/90">
            <Upload className="h-4 w-4" />
            Muat Naik Foto
          </Button>
        </div>

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-semibold">Semua Foto</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Cari foto..."
                className="h-10 w-64 pl-10 pr-4 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                      <Button variant="ghost" size="icon" className="bg-white text-neutral-800 hover:bg-neutral-100" title="Lihat">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="bg-white text-red-600 hover:bg-red-50" title="Padam">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm text-neutral-800 dark:text-neutral-100 truncate">{img.alt}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {img.category} • {img.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminGallery;
