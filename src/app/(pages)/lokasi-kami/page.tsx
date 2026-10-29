import type { Metadata } from "next";
import Image from "next/image";
import { Car, MapPin } from "lucide-react";
import PageBanner from "@/components/page-banner";
import ImagePreviewDialog from "@/components/image-preview-dialog";
import MapFacade from "@/components/map-facade";

export const metadata: Metadata = {
  title: "Lokasi Kami",
  description: "Lokasi Kem Bumi Jati, pautan Google Maps serta peta layout kem.",
  alternates: {
    canonical: "/lokasi-kami",
  },
};

const GREEN = "#1f6b3a";

const BANNER_IMAGE =
  "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati/73aa3e5f-e96a-49ec-839b-1edf029a9b48.jpg";
const MAP_LAYOUT_IMAGE =
  "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/LAYOUT%20KEM%202026.jpg";

const MAP_PREVIEW_IMAGE =
  "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/Screenshot%202026-10-29%20at%202.36.40%20PM.png";

// Replace with the real coordinates / place link
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Shah+Alam,+Selangor";
const MAP_EMBED_URL = "https://maps.google.com/maps?q=2.9633331,101.5424996&z=17&output=embed";

const LokasiKamiPage = async () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-950">
      <PageBanner title="Lokasi Kami" image={BANNER_IMAGE} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Lokasi" }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr]">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Kem Bumi Jati</h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Lot 3319 Jalan Kem Bumi Jati, Batu 7, Jalan Kebun, 40460 Shah Alam, Selangor
            </p>

            {/* <div className="mt-8 space-y-6">
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
            </div> */}
          </div>

          <MapFacade embedUrl={MAP_EMBED_URL} title="Lokasi Kem Bumi Jati" previewImage={MAP_PREVIEW_IMAGE} />
        </section>

        <section className="mt-12">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Peta &amp; Layout Kem</h3>
          <ImagePreviewDialog
            src={MAP_LAYOUT_IMAGE}
            alt="Peta dan layout Kem Bumi Jati"
            title="Peta & Layout Kem"
            // buttonLabel="Lihat Peta & Layout Kem"
          />
        </section>
      </div>
    </main>
  );
};

export default LokasiKamiPage;
