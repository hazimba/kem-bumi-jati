"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Upload, ImageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllProgramsAdmin, createProgram, updateProgram, deleteProgram, toggleProgramStatus, type ProgramItem } from "@/lib/actions/programs";

export default function AdminProgramsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProgramsAdmin();
      setPrograms(data);
    } catch (e: any) {
      toast.error(e.message || "Gagal memuat senarai program");
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
    loadData();
  }, [router, loadData]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(editingProgram?.image_url || null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, editingProgram]);

  const handleOpenCreate = () => {
    setEditingProgram(null);
    setTitle("");
    setDescription("");
    setFile(null);
    setPreviewUrl(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (prog: ProgramItem) => {
    setEditingProgram(prog);
    setTitle(prog.title);
    setDescription(prog.description);
    setFile(null);
    setPreviewUrl(prog.image_url);
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Sila masukkan tajuk program.");
      return;
    }

    setSaving(true);
    try {
      if (editingProgram) {
        await updateProgram({
          id: editingProgram.id,
          title,
          description,
          file,
          imageUrl: editingProgram.image_url,
          currentStoragePath: editingProgram.storage_path,
        });
        toast.success("Program berjaya dikemaskini!");
      } else {
        await createProgram({
          title,
          description,
          file,
        });
        toast.success("Program berjaya ditambah!");
      }
      setDialogOpen(false);
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Gagal menyimpan program");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (prog: ProgramItem) => {
    if (!confirm(`Adakah anda pasti ingin memadam program "${prog.title}"?`)) return;
    try {
      await deleteProgram(prog.id, prog.storage_path);
      toast.success("Program dipadam.");
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Gagal memadam program");
    }
  };

  const handleToggleStatus = async (prog: ProgramItem) => {
    try {
      const nextStatus = !prog.is_active;
      await toggleProgramStatus(prog.id, nextStatus);
      toast.success(`Program ${nextStatus ? "diaktifkan" : "nyahaktif"}.`);
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Gagal menukar status");
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
            <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100">Kelola Program Utama</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Urus senarai program yang dipaparkan dalam seksyen &quot;Kenapa Pilih Kem Bumi Jati&quot; di halaman utama.
            </p>
          </div>
          <Button onClick={handleOpenCreate} className="gap-2 bg-brand-dark hover:bg-brand-dark/90 text-white">
            <Plus className="h-4 w-4" /> Tambah Program
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-dark" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <Card key={prog.id} className={`overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 ${!prog.is_active ? "opacity-60" : ""}`}>
                <div className="relative aspect-[16/9] bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  {prog.image_url ? (
                    <Image src={prog.image_url} alt={prog.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-400">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow ${
                        prog.is_active
                          ? "bg-green-100 text-green-800 dark:bg-green-900/80 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/80 dark:text-red-200"
                      }`}>
                      {prog.is_active ? "Aktif" : "Nyahaktif"}
                    </span>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg font-serif">{prog.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs mt-1">{prog.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex items-center justify-end gap-2 border-t border-neutral-100 dark:border-neutral-800 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(prog)}
                    className="gap-1 text-xs">
                    {prog.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    <span>{prog.is_active ? "Nyahaktif" : "Aktifkan"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEdit(prog)}
                    className="gap-1 text-xs">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(prog)}
                    className="gap-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900">
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Padam</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
            {programs.length === 0 && (
              <div className="col-span-full text-center py-16 text-neutral-500">
                Tiada program dijumpai. Sila klik butang &quot;Tambah Program&quot; di atas.
              </div>
            )}
          </div>
        )}

        {/* Create / Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingProgram ? "Kemaskini Program" : "Tambah Program Baru"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 py-2">
              <div>
                <label className="block text-sm font-medium mb-1">Tajuk Program</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="cth: Kem Kepimpinan & Jati Diri"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Penerangan</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penerangan ringkas program..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Imej Program</label>
                <div className="flex items-center gap-4 mb-2">
                  <div className="relative h-20 w-32 shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden border">
                    {previewUrl ? (
                      <Image src={previewUrl} alt="Pratonton" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="flex items-center justify-center h-full text-neutral-400">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-dark file:text-white hover:file:bg-brand-dark/90 cursor-pointer"
                    />
                    <p className="text-xs text-neutral-500 mt-1">Format imej akan dioptimumkan ke WebP.</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
                  Batal
                </Button>
                <Button type="submit" disabled={saving} className="bg-brand-dark hover:bg-brand-dark/90 text-white gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{editingProgram ? "Simpan Perubahan" : "Cipta Program"}</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
