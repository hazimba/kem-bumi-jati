"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Globe, TrendingUp, Loader2, MapPin, Network } from "lucide-react";

type VisitorRow = {
  id: string;
  ip_address: string;
  url: string;
  city?: string;
  visited_at: string;
};

export function AdminVisitorAnalytics() {
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [ipStats, setIpStats] = useState<{ ip: string; city: string; count: number }[]>([]);
  const [urlStats, setUrlStats] = useState<{ url: string; count: number }[]>([]);
  const [recentVisits, setRecentVisits] = useState<VisitorRow[]>([]);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("site_visitors")
          .select("*")
          .order("visited_at", { ascending: false });

        if (error) {
          console.error("Error fetching analytics:", error);
          setLoading(false);
          return;
        }

        if (data) {
          setTotalVisits(data.length);

          // Unique IPs & Grouping by IP Address + City
          const ipMap: { [key: string]: { city: string; count: number } } = {};
          data.forEach((v) => {
            const ip = v.ip_address || "127.0.0.1";
            const city = v.city || "Tidak diketahui";

            if (!ipMap[ip]) {
              ipMap[ip] = { city, count: 0 };
            }
            ipMap[ip].count += 1;
          });

          setUniqueVisitors(Object.keys(ipMap).length);

          const sortedIps = Object.entries(ipMap)
            .map(([ip, meta]) => ({ ip, city: meta.city, count: meta.count }))
            .sort((a, b) => b.count - a.count);

          setIpStats(sortedIps);

          // Group by URL
          const urlMap: { [key: string]: number } = {};
          data.forEach((v) => {
            const path = v.url || "/";
            urlMap[path] = (urlMap[path] || 0) + 1;
          });

          const sortedUrls = Object.entries(urlMap)
            .map(([url, count]) => ({ url, count }))
            .sort((a, b) => b.count - a.count);

          setUrlStats(sortedUrls);
          setRecentVisits(data.slice(0, 10));
        }
      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <Loader2 className="h-6 w-6 animate-spin text-green-700" />
        <span className="ml-2 text-sm text-neutral-500">Memuatkan data analitik pelawat...</span>
      </div>
    );
  }

  const maxIpCount = Math.max(...ipStats.map((i) => i.count), 1);
  const maxUrlCount = Math.max(...urlStats.map((u) => u.count), 1);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Jumlah Lawatan (Pageviews)</p>
                <p className="mt-1 text-3xl font-bold text-neutral-900 dark:text-neutral-100">{totalVisits}</p>
              </div>
              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Pelawat Unik (IP Berbeza)</p>
                <p className="mt-1 text-3xl font-bold text-neutral-900 dark:text-neutral-100">{uniqueVisitors}</p>
              </div>
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* BAR CHART 1: IP Address & City */}
        <Card className="border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:col-span-6">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
              <Network className="h-5 w-5 text-blue-600" />
              Analisis IP Address & Bandar (City)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ipStats.length > 0 ? (
              ipStats.map(({ ip, city, count }) => {
                const percentage = Math.round((count / maxIpCount) * 100);
                return (
                  <div key={ip} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-bold text-blue-700 dark:bg-neutral-800 dark:text-blue-400">
                          {ip}
                        </code>
                        <span className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                          <MapPin className="h-3 w-3 text-rose-500" />
                          {city}
                        </span>
                      </div>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{count} lawatan</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-xs text-neutral-400">Tiada rekod IP pelawat.</p>
            )}
          </CardContent>
        </Card>

        {/* BAR CHART 2: Popular Pages (URL) */}
        <Card className="border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:col-span-6">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
              <Globe className="h-5 w-5 text-green-600" />
              Halaman Paling Sering Dilawati (URL)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {urlStats.length > 0 ? (
              urlStats.map(({ url, count }) => {
                const percentage = Math.round((count / maxUrlCount) * 100);
                return (
                  <div key={url} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-green-700 dark:bg-neutral-800 dark:text-green-400">
                        {url}
                      </code>
                      <span>{count} lawatan</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                      <div
                        className="h-full rounded-full bg-green-600 transition-all duration-500"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-xs text-neutral-400">Tiada rekod halaman dijumpai.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Visitors Detailed Logs */}
      <Card className="border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
            <Users className="h-5 w-5 text-purple-600" />
            Log Pelawat Terkini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {recentVisits.length > 0 ? (
              recentVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-800/50">
                  <div className="flex items-center gap-4">
                    <code className="font-semibold text-neutral-800 dark:text-neutral-200">{visit.url}</code>
                    <span className="text-neutral-400">|</span>
                    <span className="font-mono text-neutral-600 dark:text-neutral-400">IP: {visit.ip_address}</span>
                    <span className="flex items-center gap-1 rounded-full bg-neutral-200/60 px-2 py-0.5 text-[11px] text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                      <MapPin className="h-3 w-3 text-rose-500" />
                      {visit.city || "Lain-lain"}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {new Date(visit.visited_at).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-xs text-neutral-400">Tiada log pelawat.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
