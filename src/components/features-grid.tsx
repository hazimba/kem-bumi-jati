"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Home, Hotel, MapPin, Tent, Utensils, Waves } from "lucide-react";

const GREEN = "#1f6b3a";

const features: { label: string; icon: LucideIcon }[] = [
  { label: "Kemudahan lengkap", icon: Home },
  { label: "Penginapan asrama", icon: Hotel },
  { label: "Dewan makan", icon: Utensils },
  { label: "Kolam renang", icon: Waves },
  { label: "Susur Jalan Berbumbung", icon: Tent },
  { label: "Lokasi strategik", icon: MapPin },
];

export function FeaturesGrid() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {features.map(({ label, icon: Icon }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col items-center gap-3 rounded-2xl bg-neutral-100 px-2 py-5 text-center shadow-sm dark:bg-neutral-900">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-neutral-800">
            <Icon className="h-7 w-7" style={{ color: GREEN }} aria-hidden="true" />
          </span>
          <span className="text-xs font-bold leading-tight text-neutral-800 dark:text-neutral-100">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}
