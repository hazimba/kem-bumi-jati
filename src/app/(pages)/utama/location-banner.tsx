import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LocationBanner = () => {
  const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Kem+Bumi+Jati+Shah+Alam";

  return (
    <section className="relative h-[420px] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/location-banner.jpg"
        alt="Aerial view of the venue in Shah Alam"
        fill
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      {/* Content aligned with max-w-7xl */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-7xl px-6 pb-8 text-white sm:px-8">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">Lokasi Strategik di Shah Alam</h2>

        <p className="mt-3 text-base leading-relaxed sm:text-lg">
          Persekitaran yang selesa, selamat dan lengkap
          <br className="hidden sm:block" /> untuk pelbagai program.
        </p>

        <Button variant="secondary" className="mt-6">
          <Link
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-brand-dark shadow-md transition-all hover:bg-white sm:top-4 sm:right-4 sm:px-4 sm:py-2">
            Lihat Lokasi
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LocationBanner;
