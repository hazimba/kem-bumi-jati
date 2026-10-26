"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings, Save, Building2, Phone } from "lucide-react";

const AdminSettings = () => {
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
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-brand-dark">Tetapan Sistem</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">Konfigurasi sistem dan maklumat organisasi</p>
        </div>

        <div className="grid gap-6">
          {/* Company Info */}
          <Card className="border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-semibold">
                <Building2 className="h-5 w-5" />
                Maklumat Syarikat
              </CardTitle>
              <CardDescription>Kemas kini maklumat asas syarikat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Syarikat</Label>
                  <Input id="name" defaultValue="ZH Warisan Holdings Sdn. Bhd." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="center">Nama Pusat</Label>
                  <Input id="center" defaultValue="Kem Bumi Jati" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  defaultValue="Lot 3319, Jalan Kem Bumi Jati, Batu 7, Jalan Kebun, Seksyen 30, 40460 Shah Alam, Selangor"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" defaultValue="+603-51616692" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="bumijati4114@gmail.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" defaultValue="+601114615206" />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-semibold">
                <Settings className="h-5 w-5" />
                Tetapan Sistem
              </CardTitle>
              <CardDescription>Konfigurasi operasi sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Mata Wang</Label>
                <Input id="currency" defaultValue="MYR" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zon Waktu</Label>
                <Input id="timezone" defaultValue="Asia/Kuala_Lumpur (GMT+8)" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance">Mod Penyelenggaraan</Label>
                <div className="flex items-center gap-3 p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-900/50">
                  <input type="checkbox" id="maintenance" className="h-4 w-4" />
                  <Label htmlFor="maintenance" className="cursor-pointer m-0">
                    Aktifkan mod penyelenggaraan
                  </Label>
                </div>
              </div>

              <Button className="w-full sm:w-auto gap-2 bg-brand-dark hover:bg-brand-dark/90">
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AdminSettings;
