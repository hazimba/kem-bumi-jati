import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SECTIONS, MAX_FILE_SIZE } from "@/lib/image-sections";
import { uploadImages, type SiteImage } from "@/lib/actions/site-images";
import type { ImageType, Section } from "@/lib/actions/image-types";
import { resizeImageToLimit } from "@/lib/resize-image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  types: ImageType[];
  defaultSection: Section;
  onUploaded: (images: SiteImage[]) => void;
}

interface ImageFileItem {
  id: string;
  file: File;
  preview: string;
}

export function UploadDialog({ open, onOpenChange, types, defaultSection, onUploaded }: Props) {
  const [section, setSection] = useState<Section>(defaultSection);
  const [typeId, setTypeId] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [fileItems, setFileItems] = useState<ImageFileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const typeOptions = useMemo(() => types.filter((t) => t.section === section && t.is_active), [types, section]);

  useEffect(() => {
    if (!open) return;
    setSection(defaultSection);
    setTypeId("");
    setCaption("");
    setDescription("");
    setFileItems([]);
    setError(null);
  }, [open, defaultSection]);

  useEffect(() => setTypeId(""), [section]);

  useEffect(() => {
    return () => {
      fileItems.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [fileItems]);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    setError(null);
    setProcessing(true);

    try {
      const newItems: ImageFileItem[] = [];
      for (const f of selectedFiles) {
        if (!f.type.startsWith("image/")) {
          continue;
        }
        const resized = await resizeImageToLimit(f, MAX_FILE_SIZE);
        const previewUrl = URL.createObjectURL(resized);
        newItems.push({
          id: `${Date.now()}-${Math.random()}`,
          file: resized,
          preview: previewUrl,
        });
      }

      setFileItems((prev) => [...prev, ...newItems]);
    } catch (err) {
      console.error(err);
      setError("Gagal memproses sesetengah gambar. Sila cuba gambar lain.");
    } finally {
      setProcessing(false);
      e.target.value = "";
    }
  };

  const handleRemoveFile = (id: string) => {
    setFileItems((prev) => {
      const itemToRemove = prev.find((i) => i.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.preview);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fileItems.length === 0) return setError("Sila pilih sekurang-kurangnya satu gambar.");
    if (!typeId) return setError("Sila pilih jenis.");

    setUploading(true);
    setError(null);
    try {
      const filesToUpload = fileItems.map((item) => item.file);
      const newImages = await uploadImages({
        files: filesToUpload,
        typeId,
        caption,
        description,
      });
      onUploaded(newImages);
      onOpenChange(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Gagal memuat naik gambar. Sila cuba lagi.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !uploading && onOpenChange(o)}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Muat Naik Profil & Foto</DialogTitle>
            <DialogDescription>
              Muat naik satu atau beberapa gambar untuk profil fasiliti. Gambar pertama akan menjadi gambar utama (cover).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="upload-section">Seksyen</Label>
            <Select value={section} onValueChange={(v) => setSection(v as Section)} disabled={uploading}>
              <SelectTrigger id="upload-section" className="w-full">
                <SelectValue placeholder="Pilih seksyen" />
              </SelectTrigger>
              <SelectContent>
                {SECTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-type">Jenis / Kategori</Label>
            <Select value={typeId || undefined} onValueChange={setTypeId} disabled={uploading || typeOptions.length === 0}>
              <SelectTrigger id="upload-type" className="w-full">
                <SelectValue placeholder="Pilih jenis..." />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {typeOptions.length === 0 && (
              <p className="text-xs text-neutral-500">Tiada jenis untuk seksyen ini. Tambah dahulu di "Kelola Jenis Imej".</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-caption">Tajuk / Nama Profil</Label>
            <Input
              id="upload-caption"
              value={caption}
              disabled={uploading}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="cth: Asrama Melati (Blok A)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-description">Penerangan Profil</Label>
            <Textarea
              id="upload-description"
              value={description}
              disabled={uploading}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="cth: Mempunyai 10 bilik katil bujang, lengkap dengan tandas dan bilik air..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-file">Gambar Profil (Boleh pilih banyak)</Label>
            <Input
              id="upload-file"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              disabled={uploading || processing}
            />
            {processing && (
              <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                <Loader2 className="h-3 w-3 animate-spin" /> Mengecilkan gambar...
              </p>
            )}
          </div>

          {fileItems.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                Gambar Dipilih ({fileItems.length}) - Gambar #1 ialah Utama:
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {fileItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative aspect-[4/3] rounded-lg border overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image src={item.preview} alt={`Preview ${index + 1}`} fill unoptimized className="object-cover" />
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Utama
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => handleRemoveFile(item.id)}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full opacity-90 transition-opacity">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" disabled={uploading} onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={uploading || processing || fileItems.length === 0 || !typeId}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memuat naik...
                </>
              ) : (
                `Muat Naik (${fileItems.length} foto)`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
