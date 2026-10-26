"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ImageIcon, Calendar } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Pengguna", value: "1,234", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Pakej Aktif", value: "12", icon: Package, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Galeri Foto", value: "342", icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Tempahan Bulan Ini", value: "28", icon: Calendar, color: "text-orange-500", bg: "bg-orange-500/10" },
];

const quickActions = [
  { label: "Kelola Pengguna", href: "/admin/users", icon: Users, desc: "Tambah, edit atau padam pengguna" },
  { label: "Kelola Pakej", href: "/admin/packages", icon: Package, desc: "Urus pakej program dan harga" },
  { label: "Kelola Galeri", href: "/admin/gallery", icon: ImageIcon, desc: "Muat naik dan urus foto" },
  { label: "Tetapan Sistem", href: "/admin/settings", icon: Users, desc: "Konfigurasi sistem & profil" },
];

export default function AdminDashboard() {
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
          <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100">Dashboard Admin</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Selamat datang kembali, Admin</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Tindakan Pantas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group block p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 hover:border-brand-dark/50 hover:bg-brand-dark/5 dark:hover:bg-brand-dark/10 transition-all">
                <div className="p-3 bg-brand-dark/10 dark:bg-brand-dark/20 rounded-lg w-fit mb-4 group-hover:scale-105 transition-transform">
                  <action.icon className="h-6 w-6 text-brand-dark" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-dark transition-colors">
                  {action.label}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
