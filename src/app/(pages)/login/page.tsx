"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo credentials
    if (email === "admin@kembumijati.com" && password === "admin123") {
      // In real app, you'd set auth cookie/token here
      localStorage.setItem("admin_auth", "true");
      router.push("/admin");
      router.refresh();
    } else {
      setError("Email atau kata laluan tidak sah. Cuba: admin@kembumijati.com / admin123");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/kbj-icon.jpeg" alt="Kem Bumi Jati Logo" width={50} height={50} className="rounded-lg" />
            <div>
              <h1 className="font-serif text-2xl font-bold text-brand-dark">Kem Bumi Jati</h1>
              <p className="text-xs text-brand-dark font-medium">Admin Panel</p>
            </div>
          </Link>
        </div>

        <Card className="shadow-xl border-neutral-200 dark:border-neutral-700">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-serif text-2xl text-brand-dark">Log Masuk Admin</CardTitle>
            <CardDescription className="text-neutral-500 dark:text-neutral-400">
              Masukkan email dan kata laluan untuk mengakses panel pentadbir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800 flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Emel
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kembumijati.com"
                  className="h-11"
                  required
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Kata Laluan
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 pr-11"
                    required
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    aria-label={showPassword ? "Sembunyikan kata laluan" : "Tunjukkan kata laluan"}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-brand-dark hover:bg-brand-dark/90 text-white font-medium rounded-lg transition-colors"
                disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sedang log masuk...
                  </span>
                ) : (
                  "Log Masuk"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Demo:{" "}
              <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-brand-dark font-mono text-[11px]">
                admin@kembumijati.com
              </code>{" "}
              /{" "}
              <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-brand-dark font-mono text-[11px]">
                admin123
              </code>
            </p>
            <Link href="/" className="text-sm text-brand-dark hover:underline font-medium">
              ← Kembali ke laman utama
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;
