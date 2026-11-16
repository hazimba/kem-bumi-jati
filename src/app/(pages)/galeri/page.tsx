import type { Metadata } from "next";
import PageBanner from "@/components/page-banner";
import GalleryGrid from "@/components/gallery-grid";
import { getPageBannerBySlug } from "@/lib/actions/page-banners";
import ExpandableText from "@/components/expandable-text";

export const metadata: Metadata = {
  title: "Galeri Program & Kemudahan | Kem Bumi Jati Shah Alam",
  description:
    "Lihat koleksi gambar program, aktiviti dan kemudahan di Kem Bumi Jati, Shah Alam, Selangor. Terokai suasana kem, asrama, dewan dan kawasan latihan.",
  alternates: {
    canonical: "/galeri",
  },
};

const DEFAULT_BANNER_IMAGE = "https://images.kembumijati.com/kem_bumi_jati_header_background_img/IMG_20260115_155433.jpg";

const GaleriPage = async () => {
  const bannerImage = await getPageBannerBySlug("galeri", DEFAULT_BANNER_IMAGE);

  return (
    <main className="w-full bg-background pt-26 text-foreground">
      <PageBanner
        title="Galeri Program & Kemudahan"
        image={bannerImage}
        breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Galeri" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section aria-labelledby="galeri-heading" className="mb-8 max-w-7xl sm:mb-10">
          <h2 id="galeri-heading" className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-3xl">
            Galeri Aktiviti, Program & Kemudahan Kem Bumi Jati
          </h2>

          <ExpandableText
            maxWords={20}
            className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg"
            text="Terokai koleksi gambar program, aktiviti dan kemudahan yang terdapat di Kem Bumi Jati, Jalan Kebun, Shah Alam, Selangor. Galeri ini memaparkan suasana persekitaran kem, kemudahan penginapan, dewan serta kawasan latihan yang disediakan untuk pelbagai program dan aktiviti berkumpulan."
          />
        </section>

        <GalleryGrid />
      </div>
    </main>
  );
};

export default GaleriPage;
