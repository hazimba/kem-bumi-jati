"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Pakej Asas",
    normalPrice: 15,
    earlyPrice: 13,
    unit: "/peserta",
    note: "Program setengah hari (4 jam)",
    features: ["Guna dewan latihan asas", "PA System & LCD projector", "1 sesi program (4 jam)", "Air mineral disediakan"],
    cta: "Pilih Pakej Asas",
    image: "https://mishu.my/wp-content/uploads/2026/04/example-of-a-training-centre-in-malaysia-1024x1024.webp",
    recommended: false,
  },
  {
    name: "Pakej Standard",
    normalPrice: 45,
    earlyPrice: 35,
    unit: "/peserta",
    note: "Program sehari penuh (8 jam)",
    features: [
      "Semua ciri Pakej Asas",
      "Program sehari penuh (8 jam)",
      "2x makanan & minuman ringan",
      "Jurulatih bertauliah",
      "Sijil penyertaan",
    ],
    cta: "Pilih Pakej Standard",
    image: "https://orengacademy.com/wp-content/uploads/2026/01/IMG_9168-scaled.jpg",
    recommended: false,
  },
  {
    name: "Pakej Eksklusif",
    normalPrice: 120,
    earlyPrice: 95,
    unit: "/peserta",
    note: "Program 2 hari 1 malam",
    features: [
      "Semua ciri Pakej Standard",
      "Program 2 hari 1 malam",
      "Penginapan & 4x makanan",
      "Aktiviti team building & motivasi",
      "Jurulatih profesional & sijil rasmi",
    ],
    cta: "Pilih Pakej Eksklusif",
    image: "https://www.plmgrp.com/p/getc-04.jpg",
    recommended: true,
  },
];

const PricingSection = () => {
  const [earlyBird, setEarlyBird] = useState(true);

  return (
    <section className="fraunces bg-tertiary py-20 px-6 sm:px-14">
      <div className="mx-auto max-w-6xl text-center">
        <p className="reveal-up text-xs tracking-[0.3em] uppercase text-[#D4A24C] font-semibold">Pakej Program</p>

        <h2
          className="reveal-up mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark italic"
          style={{ animationDelay: "80ms" }}>
          Pilih Pakej Latihan Anda
        </h2>

        <p
          className="reveal-up mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-600"
          style={{ animationDelay: "160ms" }}>
          Pilih pakej yang sesuai dengan keperluan program anda. Hubungi kami jika perlukan pakej tersuai.
        </p>

        {/* Toggle */}
        <div className="mt-10 flex flex-col items-center gap-3" style={{ animationDelay: "220ms" }}>
          <div className="flex items-center gap-4">
            <span className={cn("text-sm font-medium transition-colors", !earlyBird ? "text-brand-dark italic" : "text-neutral-400")}>
              Harga Normal
            </span>

            <div className="relative">
              <button
                onClick={() => setEarlyBird((v) => !v)}
                className="relative h-7 w-14 rounded-full bg-secondary transition-colors duration-300"
                aria-label="Toggle early bird pricing">
                <span
                  className={cn(
                    "absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300",
                    earlyBird ? "translate-x-7" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            <span className={cn("text-sm font-medium transition-colors", earlyBird ? "text-brand-dark italic" : "text-neutral-400")}>
              Tempahan Awal
            </span>
          </div>
        </div>

        {/* Cards Wrapper */}
        <div
          className={cn(
            "mt-14",
            "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 items-stretch",
            "scrollbar-hide",
            "md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
          )}>
          {packages.map((pkg, idx) => {
            const price = earlyBird ? pkg.earlyPrice : pkg.normalPrice;
            const saved = pkg.normalPrice - pkg.earlyPrice;

            return (
              <div
                key={pkg.name}
                style={{ animationDelay: `${280 + idx * 140}ms` }}
                className={cn(
                  "relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white text-left transition-shadow duration-300",
                  "w-[85%] sm:w-[320px] snap-center shrink-0 md:w-auto md:shrink md:snap-none",
                  pkg.recommended ? "border-[#D4A24C] card-glow" : "border-neutral-200 hover:shadow-xl"
                )}>
                {/* Badge area reserved space */}
                {pkg.recommended ? (
                  <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-[#D4A24C] to-[#8B5FBF] py-2 text-center text-xs font-bold uppercase tracking-wider text-white">
                    Disyorkan
                  </div>
                ) : null}

                {/* Main Card Body */}
                <div className={cn("flex flex-col flex-1 justify-between p-6", pkg.recommended ? "pt-12" : "pt-6")}>
                  <div>
                    <div className="flex items-start justify-between">
                      <p className="font-serif text-lg font-semibold uppercase tracking-wide text-brand-dark italic">{pkg.name}</p>
                      {saved > 0 && earlyBird && <p className="text-xs italic text-neutral-500">Jimat RM{saved}</p>}
                    </div>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold text-brand-dark italic">RM{price}</span>
                      <span className="text-sm text-neutral-500">{pkg.unit}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-xs text-neutral-500">{pkg.note}</p>
                      {saved > 0 && earlyBird && <p className="text-xs text-neutral-400 line-through">RM{pkg.normalPrice}</p>}
                    </div>

                    <div className="mt-4 border-t border-neutral-200" />

                    <ul className="mt-4 flex flex-col gap-2.5">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-neutral-700">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A24C]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button anchored to bottom of content area */}
                  <div className="mt-8">
                    <button
                      className={cn(
                        "w-full rounded-lg border py-2.5 text-sm font-semibold transition-all duration-300",
                        pkg.recommended
                          ? "border-[#1A1A1A] bg-[#1A1A1A] text-white hover:bg-[#333]"
                          : "border-neutral-300 text-brand-dark italic hover:border-[#D4A24C] hover:bg-[#D4A24C]/5"
                      )}>
                      {pkg.cta}
                    </button>
                  </div>
                </div>

                {/* Bottom Image */}
                <div className="relative h-40 sm:h-44 w-full shrink-0 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile indicators */}
        <div className="mt-3 flex justify-center gap-1.5 md:hidden">
          {packages.map((pkg) => (
            <span key={pkg.name} className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
          ))}
        </div>

        <p className="reveal-up mt-10 text-xs sm:text-sm text-neutral-500 italic" style={{ animationDelay: "700ms" }}>
          Anda boleh tempah pakej mengikut bilangan peserta. Hubungi kami untuk pakej tersuai.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
