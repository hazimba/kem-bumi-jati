"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Search, Edit, Trash2 } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad@school.edu", role: "Guru", status: "Aktif", avatar: "AF" },
  { id: 2, name: "Siti Noraini", email: "siti@corporate.com", role: "HR Manager", status: "Aktif", avatar: "SN" },
  { id: 3, name: "Mohd Razak", email: "razak@gov.my", role: "Pegawai", status: "Tidak Aktif", avatar: "MR" },
  { id: 4, name: "Nurul Izzah", email: "izzah@university.edu", role: "Pelajar", status: "Aktif", avatar: "NI" },
  { id: 5, name: "Tan Wei Ming", email: "weiming@company.com", role: "Pengurus", status: "Aktif", avatar: "TW" },
];

export default function AdminUsers() {
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
            <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100">Kelola Pengguna</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">Senarai semua pengguna terdaftar</p>
          </div>
          <Button className="gap-2 bg-brand-dark hover:bg-brand-dark/90">
            <Plus className="h-4 w-4" />
            Tambah Pengguna
          </Button>
        </div>

        <Card className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-semibold text-neutral-900 dark:text-neutral-100">Senarai Pengguna</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Cari pengguna..."
                className="h-10 w-64 pl-10 pr-4 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Pengguna</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Emel</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Peranan</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-brand-dark/10 flex items-center justify-center text-brand-dark font-bold text-sm">
                            {user.avatar}
                          </div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">{user.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === "Aktif" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}`}>{user.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-brand-dark hover:bg-brand-dark/10 dark:hover:bg-brand-dark/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20">
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
}