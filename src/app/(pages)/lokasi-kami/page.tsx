import type { Metadata } from "next";
// import Image from "next/image";
// import { Car, MapPin } from "lucide-react";
import PageBanner from "@/components/page-banner";
import ImagePreviewDialog from "@/components/image-preview-dialog";
import MapFacade from "@/components/map-facade";
import { getPageBannerBySlug } from "@/lib/actions/page-banners";
import AnimatedItem from "@/components/animated-item";
import { AnimatedTextGroup, AnimatedTextChild } from "@/components/animation-text-group";

export const metadata: Metadata = {
  title: "Lokasi Kami",
  description: "Lokasi Kem Bumi Jati, pautan Google Maps serta peta layout kem.",
  alternates: {
    canonical: "/lokasi-kami",
  },
};

const DEFAULT_BANNER = "https://images.kembumijati.com/kem_bumi_jati/73aa3e5f-e96a-49ec-839b-1edf029a9b48.jpg";
const MAP_LAYOUT_IMAGE = "https://images.kembumijati.com/kem_bumi_jati_header_background_img/LAYOUT%20KEM%202026.jpg";

const MAP_PREVIEW_IMAGE =
  "https://images.kembumijati.com/kem_bumi_jati_header_background_img/Screenshot%202026-10-29%20at%202.36.40%20PM.png";

const MAP_EMBED_URL = "https://maps.google.com/maps?q=2.9633331,101.5424996&z=17&output=embed";

const LokasiKamiPage = async () => {
  const bannerImage = await getPageBannerBySlug("lokasi-kami", DEFAULT_BANNER);

  return (
    <main className="w-full bg-white dark:bg-neutral-950 pt-26">
      <PageBanner title="Lokasi Kami" image={bannerImage} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Lokasi" }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr]">
          <AnimatedTextGroup staggerDelay={0.2}>
            <AnimatedTextChild as="h2" className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              Kem Bumi Jati
            </AnimatedTextChild>

            <AnimatedTextChild as="p" className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Lot 3319 Jalan Kem Bumi Jati, Batu 7, Jalan Kebun, 40460 Shah Alam, Selangor
            </AnimatedTextChild>
          </AnimatedTextGroup>

          <AnimatedItem as="div" direction="right" duration={0.8} distance={30} delay={0.2}>
            <MapFacade embedUrl={MAP_EMBED_URL} title="Lokasi Kem Bumi Jati" previewImage={MAP_PREVIEW_IMAGE} />
          </AnimatedItem>
        </section>

        <section className="mt-12">
          <AnimatedTextGroup staggerDelay={0.2}>
            <AnimatedTextChild as="h3" className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
              Peta &amp; Layout Kem
            </AnimatedTextChild>
          </AnimatedTextGroup>

          <AnimatedItem as="div" direction="up" duration={0.8} distance={25} delay={0.2} className="mt-4">
            <ImagePreviewDialog src={MAP_LAYOUT_IMAGE} alt="Peta dan layout Kem Bumi Jati" title="Peta & Layout Kem" />
          </AnimatedItem>
        </section>
      </div>
    </main>
  );
};

export default LokasiKamiPage;
