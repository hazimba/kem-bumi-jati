import AnimatedText from "@/components/animated-text-fade-in";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LocationBanner = () => {
  const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Kem+Bumi+Jati+Shah+Alam";

  return (
    <section className="relative h-[420px] w-full overflow-hidden">
      <Image
        src="https://images.kembumijati.com/kem_bumi_jati/75165be6-ea04-492b-9c4d-ed88b65db9a9.webp"
        alt="Aerial view of the venue in Shah Alam"
        fill
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-7xl px-6 pb-8 text-white sm:px-8">
        <div className="mx-auto max-w-7xl pb-4">
          <div className="max-w-5xl">
            <AnimatedText as="h2" className="text-2xl font-bold leading-tight sm:text-3xl" duration={0.6}>
              Lokasi Strategik Kem Bumi Jati di Shah Alam
            </AnimatedText>

            <AnimatedText as="p" className="mt-3 text-base leading-relaxed sm:text-lg" delay={0.2} duration={0.8}>
              Terletak di Jalan Kebun, Shah Alam, Selangor, Kem Bumi Jati menyediakan lokasi untuk pelbagai program motivasi, kem
              kepimpinan, latihan berkumpulan dan aktiviti pembangunan diri. Persekitaran kem serta kemudahan yang disediakan menjadikannya
              pilihan untuk penganjuran program sekolah, organisasi dan kumpulan.
            </AnimatedText>
          </div>
        </div>

        <Button variant="secondary" className="mt-6 hover:bg-primary">
          <Link
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:!bg-primary hover:text-white rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-brand-dark shadow-md transition-all sm:top-4 sm:right-4 sm:px-4 sm:py-2">
            Lihat Lokasi
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LocationBanner;
