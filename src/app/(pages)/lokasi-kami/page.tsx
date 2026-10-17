import type { Metadata } from "next";
import Image from "next/image";
import { Car, MapPin } from "lucide-react";
import PageBanner from "@/components/page-banner";

export const metadata: Metadata = {
  title: "Lokasi Kami | Kem Bumi Jati",
  description: "Lokasi Kem Bumi Jati, pautan Google Maps dan Waze serta peta layout kem.",
};

const GREEN = "#1f6b3a";

const BANNER_IMAGE = "https://placehold.co/1600x500/png?text=Banner";
const MAP_LAYOUT_IMAGE = "https://placehold.co/1400x500/png?text=Peta+%26+Layout+Kem";

// Replace with the real coordinates / place link
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Shah+Alam,+Selangor";
const WAZE_URL = "https://waze.com/ul?q=Shah%20Alam%20Selangor&navigate=yes";
const MAP_EMBED_URL = "https://www.google.com/maps?q=Shah+Alam,+Selangor&output=embed";

const LokasiKamiPage = () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-950">
      <PageBanner title="Lokasi Kami" image={BANNER_IMAGE} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Lokasi" }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr]">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Kem Bumi Jati</h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Jalan Kebun
              <br />
              Shah Alam, Selangor
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-9 w-9 shrink-0" style={{ color: GREEN }} aria-hidden="true" />
                <div>
                  <p className="text-base font-medium text-neutral-700 dark:text-neutral-300">Google Maps</p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: GREEN }}>
                    Buka Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Car className="mt-1 h-9 w-9 shrink-0 text-neutral-800 dark:text-neutral-300" aria-hidden="true" />
                <div>
                  <p className="text-base font-medium text-neutral-700 dark:text-neutral-300">Waze</p>
                  <a
                    href={WAZE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: GREEN }}>
                    Buka Waze
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl shadow-sm">
            <iframe
              title="Lokasi Kem Bumi Jati"
              src={MAP_EMBED_URL}
              className="h-72 w-full border-0 sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        {/* Peta & Layout */}
        <section className="mt-12">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Peta &amp; Layout Kem</h3>
          <div className="relative mt-4 aspect-[16/6] w-full overflow-hidden rounded-xl shadow-sm">
            <Image src={MAP_LAYOUT_IMAGE} alt="Peta dan layout Kem Bumi Jati" fill unoptimized className="object-cover" />
            <a
              href={MAP_LAYOUT_IMAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 rounded-lg border-2 border-white/80 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: GREEN }}>
              Lihat Peta Besar
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LokasiKamiPage;
