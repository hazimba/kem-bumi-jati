"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Search, Edit, Trash2, Eye } from "lucide-react";

const mockPackages = [
  { id: 1, name: "Pakej Asas", type: "Setengah Hari", price: "RM 15", participants: "Min 20", status: "Aktif" },
  { id: 2, name: "Pakej Standard", type: "Sehari Penuh", price: "RM 45", participants: "Min 20", status: "Aktif" },
  { id: 3, name: "Pakej Eksklusif", type: "2 Hari 1 Malam", price: "RM 120", participants: "Min 30", status: "Aktif" },
  { id: 4, name: "Pakej Korporat", type: "2 Hari 1 Malam", price: "RM 180", participants: "Min 25", status: "Tidak Aktif" },
];

const AdminPackages = () => {
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
            <h1 className="font-serif text-3xl font-bold text-brand-dark">Kelola Pakej Program</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">Urus pakej latihan dan harga</p>
          </div>
          <Button className="gap-2 bg-brand-dark hover:bg-brand-dark/90">
            <Plus className="h-4 w-4" />
            Tambah Pakej
          </Button>
        </div>

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="font-semibold">Senarai Pakej</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Pakej
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Jenis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Peserta Min
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {mockPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                      <td className="px-6 py-4 font-medium text-neutral-800 dark:text-neutral-100">{pkg.name}</td>
                      <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{pkg.type}</td>
                      <td className="px-6 py-4 font-semibold text-brand-dark">{pkg.price}</td>
                      <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{pkg.participants}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            pkg.status === "Aktif"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          }`}>
                          {pkg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-500 hover:text-brand-dark hover:bg-brand-dark/10"
                            title="Lihat">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-500 hover:text-brand-dark hover:bg-brand-dark/10"
                            title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                            title="Padam">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default AdminPackages;
