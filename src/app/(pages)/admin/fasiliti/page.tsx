"use client";

import { useState } from "react";
import { Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminGuard } from "@/hooks/use-admin-guard";
import { useImageAdmin } from "@/hooks/use-image-admin";
import type { SiteImage } from "@/lib/actions/site-images";
import { ImageTypeManager } from "./image-type-manager";
import { SectionFilter } from "./section-filter";
import { ImageCard } from "./image-card";
import { UploadDialog } from "./upload-dialog";
import { DeleteImageDialog } from "./delete-image-dialog";

export default function AdminFaciliti() {
  const ready = useAdminGuard();
  const admin = useImageAdmin();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [toDelete, setToDelete] = useState<SiteImage | null>(null);

  if (!ready) return null; // keep below all hooks

  const selectedLabel = admin.sectionTypes.find((t) => t.id === admin.selectedTypeId)?.label;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ImageTypeManager types={admin.types} onChanged={admin.loadTypes} />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-dark">Kelola Fasiliti dan Galeri</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">Muat naik dan urus gambar</p>
          </div>
          <Button variant="secondary" className="gap-2 text-white" onClick={() => setUploadOpen(true)}>
            <Upload className="h-4 w-4" /> Muat Naik Foto
          </Button>
        </div>

        <SectionFilter
          section={admin.section}
          onSectionChange={admin.changeSection}
          types={admin.sectionTypes}
          selectedTypeId={admin.selectedTypeId}
          onTypeChange={admin.setSelectedTypeId}
        />

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-semibold">{selectedLabel ?? "Semua Foto"}</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={admin.search}
                onChange={(e) => admin.setSearch(e.target.value)}
                placeholder="Cari foto..."
                className="h-10 w-64 pl-10 pr-4 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {admin.filteredImages.map((img) => (
                <ImageCard key={img.id} image={img} onDelete={setToDelete} />
              ))}
              {admin.filteredImages.length === 0 && (
                <p className="col-span-full text-center text-neutral-500 dark:text-neutral-400 py-8">
                  Tiada gambar untuk dipaparkan. Muat naik gambar pertama anda.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <UploadDialog
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          types={admin.types}
          defaultSection={admin.section}
          onUploaded={admin.addImage}
        />

        <DeleteImageDialog
          image={toDelete}
          onCancel={() => setToDelete(null)}
          onConfirm={async () => {
            if (toDelete) await admin.removeImage(toDelete);
            setToDelete(null);
          }}
        />
      </div>
    </div>
  );
}
