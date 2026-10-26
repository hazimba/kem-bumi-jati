"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Trash2, Eye, EyeOff, ImagePlus, ImageIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  createImageType,
  updateImageType,
  deleteImageType,
  setImageTypeCover,
  type ImageType,
  type Section,
} from "@/lib/actions/image-types";
import { SECTIONS, MAX_FILE_SIZE } from "@/lib/image-sections";
import { resizeImageToLimit } from "@/lib/resize-image";

interface Props {
  types: ImageType[];
  onChanged: () => void;
}

// validate + resize; returns null (and toasts) if not usable
async function prepareImage(file: File | undefined) {
  if (!file) return null;
  if (!file.type.startsWith("image/")) {
    toast.error("Sila pilih fail imej sahaja.");
    return null;
  }
  try {
    return await resizeImageToLimit(file, MAX_FILE_SIZE);
  } catch {
    toast.error("Gagal memproses gambar.");
    return null;
  }
}

export function ImageTypeManager({ types, onChanged }: Props) {
  const [section, setSection] = useState<Section>("faciliti");
  const [label, setLabel] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(0); // remounts the file input to clear it
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!cover) return setCoverPreview(null);
    const url = URL.createObjectURL(cover);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [cover]);

  const run = async (fn: () => Promise<unknown>, okMsg: string) => {
    setBusy(true);
    try {
      await fn();
      toast.success(okMsg);
      onChanged();
      return true;
    } catch (e: any) {
      toast.error(e.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const handleCoverPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusy(true);
    setCover(await prepareImage(e.target.files?.[0]));
    setBusy(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    const ok = await run(() => createImageType(section, label, cover), "Jenis imej dicipta");
    if (ok) {
      setLabel("");
      setCover(null);
      setFileKey((k) => k + 1);
    }
  };

  const handleChangeCover = async (t: ImageType, e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = await prepareImage(input.files?.[0]);
    input.value = ""; // allow picking the same file again
    if (file) await run(() => setImageTypeCover(t, file), "Cover dikemas kini");
  };

  return (
    <Accordion type="single" collapsible className="mb-6 rounded-xl border bg-white dark:bg-neutral-900">
      <AccordionItem value="types" className="border-none">
        <AccordionTrigger className="px-4 font-medium !no-underline">Kelola Jenis Imej ({types.length})</AccordionTrigger>

        <AccordionContent className="px-4 pb-4 space-y-5">
          <form onSubmit={handleCreate} className="space-y-2 mt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={section} onValueChange={(v) => setSection(v as Section)}>
                <SelectTrigger className="!h-10 w-full sm:w-[160px]">
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

              <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="cth: Dewan Kuliah" className="flex-1" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Input key={fileKey} type="file" accept="image/*" disabled={busy} onChange={handleCoverPick} className="flex-1" />
              {coverPreview && (
                <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded border">
                  <Image src={coverPreview} alt="Pratonton cover" fill unoptimized className="object-cover" />
                </div>
              )}
              <Button type="submit" disabled={busy || !label.trim()} className="gap-2 bg-brand-dark text-white h-10">
                <Plus className="h-4 w-4" /> Tambah
              </Button>
            </div>
            <p className="text-xs text-neutral-500">Cover (pilihan). Gambar besar dikecilkan secara automatik.</p>
          </form>

          {SECTIONS.map(({ value: sec, label: secLabel }) => (
            <div key={sec}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">{secLabel}</h3>
              <ul className="divide-y rounded-lg border">
                {types
                  .filter((t) => t.section === sec)
                  .map((t) => (
                    <li key={t.id} className="flex items-center gap-3 px-3 py-2">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded border bg-neutral-100 dark:bg-neutral-800">
                        {t.cover_url ? (
                          <Image src={t.cover_url} alt={t.label} fill unoptimized className="object-cover" />
                        ) : (
                          <ImageIcon className="absolute inset-0 m-auto h-4 w-4 text-neutral-400" />
                        )}
                      </div>

                      <span className={`flex-1 text-sm ${!t.is_active ? "opacity-50 line-through" : ""}`}>
                        {t.label}
                        <span className="ml-2 text-xs text-neutral-400">{t.slug}</span>
                      </span>

                      {/* change cover */}
                      <Button asChild size="icon" variant="ghost" disabled={busy} title="Tukar cover">
                        <label className="cursor-pointer">
                          <ImagePlus className="h-4 w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            disabled={busy}
                            onChange={(e) => handleChangeCover(t, e)}
                          />
                        </label>
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={busy}
                        title={t.is_active ? "Nyahaktif" : "Aktifkan"}
                        onClick={() => run(() => updateImageType(t.id, { is_active: !t.is_active }), "Dikemas kini")}>
                        {t.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={busy}
                        onClick={() => {
                          if (confirm(`Padam "${t.label}"?`)) run(() => deleteImageType(t.id), "Jenis imej dipadam");
                        }}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </li>
                  ))}
                {types.filter((t) => t.section === sec).length === 0 && (
                  <li className="px-3 py-2 text-sm text-neutral-400">Tiada jenis lagi.</li>
                )}
              </ul>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
