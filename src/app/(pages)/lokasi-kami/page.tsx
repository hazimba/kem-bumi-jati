import type { Metadata } from "next";
import PageBanner from "@/components/page-banner";
import MapFacade from "@/components/map-facade";
import { getPageBannerBySlug } from "@/lib/actions/page-banners";
import AnimatedItem from "@/components/animated-item";
import ImagePreviewUrlDialog from "@/components/image-preview-url-dialog";

export const metadata: Metadata = {
  title: "Lokasi Kem Bumi Jati di Shah Alam, Selangor",
  description:
    "Dapatkan lokasi dan alamat Kem Bumi Jati di Jalan Kebun, Shah Alam, Selangor. Lihat peta Google Maps, panduan lokasi dan pelan susun atur kem untuk memudahkan perjalanan anda.",
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
    <main className="w-full bg-white pt-26 sm:pt-20 dark:bg-neutral-950">
      <PageBanner title="Lokasi Kami" image={bannerImage} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Lokasi" }]} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section aria-labelledby="lokasi-heading" className="mb-8 max-w-7xl sm:mb-10">
          <h2 id="lokasi-heading" className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-3xl">
            Lokasi Kem Bumi Jati di Jalan Kebun, Shah Alam
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
            Kem Bumi Jati terletak di Jalan Kebun, Shah Alam, Selangor. Rancang perjalanan anda dengan mudah melalui peta lokasi Google Maps
            yang disediakan. Anda juga boleh melihat pelan susun atur kem untuk mengenali kedudukan kemudahan dan kawasan aktiviti sebelum
            berkunjung ke Kem Bumi Jati.
          </p>
        </section>

        {/* Location & Google Maps */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Alamat Kem Bumi Jati</h2>

            <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Lot 3319 Jalan Kem Bumi Jati, Batu 7, Jalan Kebun, 40460 Shah Alam, Selangor
            </p>
          </div>

          <AnimatedItem as="div" direction="right" duration={0.8} distance={30} delay={0.2}>
            <MapFacade embedUrl={MAP_EMBED_URL} title="Lokasi Kem Bumi Jati" previewImage={MAP_PREVIEW_IMAGE} />
          </AnimatedItem>
        </section>

        {/* Camp Layout Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Peta &amp; Layout Kem</h2>

          <AnimatedItem as="div" direction="up" duration={0.8} distance={25} delay={0.2} className="mt-4">
            <ImagePreviewUrlDialog
              src={MAP_LAYOUT_IMAGE}
              alt="Peta dan pelan susun atur Kem Bumi Jati di Shah Alam"
              title="Peta & Layout Kem"
            />
          </AnimatedItem>
        </section>
      </div>
    </main>
  );
};

export default LokasiKamiPage;
