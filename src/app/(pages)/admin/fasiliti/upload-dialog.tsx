import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SECTIONS, MAX_FILE_SIZE } from "@/lib/image-sections";
import { uploadImage, type SiteImage } from "@/lib/actions/site-images";
import type { ImageType, Section } from "@/lib/actions/image-types";
import { resizeImageToLimit } from "@/lib/resize-image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  types: ImageType[]; // all types
  defaultSection: Section;
  onUploaded: (image: SiteImage) => void;
}

export function UploadDialog({ open, onOpenChange, types, defaultSection, onUploaded }: Props) {
  const [section, setSection] = useState<Section>(defaultSection);
  const [typeId, setTypeId] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const typeOptions = useMemo(() => types.filter((t) => t.section === section && t.is_active), [types, section]);

  // reset every time the dialog opens
  useEffect(() => {
    if (!open) return;
    setSection(defaultSection);
    setTypeId("");
    setCaption("");
    setFile(null);
    setError(null);
  }, [open, defaultSection]);

  // changing section invalidates the chosen type
  useEffect(() => setTypeId(""), [section]);

  // preview URL lifecycle
  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setError("Sila pilih fail imej sahaja.");
      return setFile(null);
    }

    setError(null);
    setProcessing(true);
    try {
      setFile(await resizeImageToLimit(f, MAX_FILE_SIZE));
    } catch (err) {
      console.error(err);
      setError("Gagal memproses gambar. Sila cuba gambar lain.");
      setFile(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Sila pilih gambar.");
    if (!typeId) return setError("Sila pilih jenis.");

    setUploading(true);
    setError(null);
    try {
      const image = await uploadImage({ file, typeId, caption });
      onUploaded(image);
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
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Muat Naik Foto</DialogTitle>
            <DialogDescription>Pilih seksyen, jenis dan gambar. Maksimum 5MB.</DialogDescription>
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
            <Label htmlFor="upload-type">Jenis</Label>
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
            <Label htmlFor="upload-caption">Keterangan (pilihan)</Label>
            <Input
              id="upload-caption"
              value={caption}
              disabled={uploading}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="cth: Bilik Mesyuarat"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-file">Gambar</Label>
            <Input id="upload-file" type="file" accept="image/*" onChange={handleFileChange} disabled={uploading || processing} />
            {processing && (
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" /> Mengecilkan gambar...
              </p>
            )}
            <Button type="button" variant="outline" disabled={uploading} onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={uploading || processing || !file || !typeId}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memuat naik...
                </>
              ) : (
                "Muat Naik"
              )}
            </Button>
            {preview && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                <Image src={preview} alt="Pratonton" fill unoptimized className="object-cover" />
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
