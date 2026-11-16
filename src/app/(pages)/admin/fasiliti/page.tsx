"use client";

import { useState } from "react";
import { Upload, Search, Trash, Layers } from "lucide-react";
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
  const [groupToDelete, setGroupToDelete] = useState<{ caption: string; items: SiteImage[] } | null>(null);

  if (!ready) return null;

  const selectedLabel = admin.sectionTypes.find((t) => t.id === admin.selectedTypeId)?.label;

  // Group images by profile caption if present
  const groupedProfiles = admin.filteredImages.reduce((acc, img) => {
    const key = img.caption?.trim() || `unnamed_${img.id}`;
    if (!acc[key]) {
      acc[key] = {
        caption: img.caption || "Tanpa Nama Profil",
        description: img.description,
        typeLabel: img.type_label,
        items: [],
      };
    }
    acc[key].items.push(img);
    return acc;
  }, {} as Record<string, { caption: string; description: string | null; typeLabel: string; items: SiteImage[] }>);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ImageTypeManager types={admin.types} onChanged={admin.loadTypes} />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-dark">Kelola Fasiliti dan Galeri</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">Muat naik dan urus gambar mengikut profil fasiliti</p>
          </div>
          <Button variant="secondary" className="gap-2 text-white" onClick={() => setUploadOpen(true)}>
            <Upload className="h-4 w-4" /> Muat Naik Profil Foto
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
            <CardTitle className="font-semibold">{selectedLabel ?? "Semua Foto & Profil"}</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={admin.search}
                onChange={(e) => admin.setSearch(e.target.value)}
                placeholder="Cari foto / profil..."
                className="h-10 w-64 pl-10 pr-4 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            {Object.keys(groupedProfiles).length === 0 ? (
              <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
                Tiada gambar untuk dipaparkan. Muat naik profil gambar pertama anda.
              </p>
            ) : (
              Object.entries(groupedProfiles).map(([key, group]) => (
                <div
                  key={key}
                  className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-white dark:bg-neutral-900 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-emerald-600" />
                        <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100">{group.caption}</h3>
                        <span className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">
                          {group.items.length} foto
                        </span>
                      </div>
                      {group.description && <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{group.description}</p>}
                    </div>
                    {group.items.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30 gap-1 self-start sm:self-auto"
                        onClick={() => setGroupToDelete({ caption: group.caption, items: group.items })}>
                        <Trash className="h-4 w-4" /> Padam Seluruh Profil
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {group.items.map((img) => (
                      <ImageCard key={img.id} image={img} onDelete={setToDelete} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <UploadDialog
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          types={admin.types}
          defaultSection={admin.section}
          onUploaded={admin.addImages}
        />

        <DeleteImageDialog
          image={toDelete}
          onCancel={() => setToDelete(null)}
          onConfirm={async () => {
            if (toDelete) await admin.removeImage(toDelete);
            setToDelete(null);
          }}
        />

        {groupToDelete && (
          <DeleteImageDialog
            image={
              {
                id: "group",
                filename: `profil "${groupToDelete.caption}" beserta ${groupToDelete.items.length} gambar`,
                storage_path: "",
              } as any
            }
            onCancel={() => setGroupToDelete(null)}
            onConfirm={async () => {
              if (groupToDelete) await admin.removeProfileGroup(groupToDelete.items);
              setGroupToDelete(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
