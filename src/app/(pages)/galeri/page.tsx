import type { Metadata } from "next";
import PageBanner from "@/components/page-banner";
import GalleryGrid from "@/components/gallery-grid";
import { getPageBannerBySlug } from "@/lib/actions/page-banners";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Galeri program dan kemudahan Kem Bumi Jati.",
  alternates: {
    canonical: "/galeri",
  },
};

const DEFAULT_BANNER_IMAGE = "https://images.kembumijati.com/kem_bumi_jati_header_background_img/IMG_20260115_155433.jpg";

const GaleriPage = async () => {
  const bannerImage = await getPageBannerBySlug("galeri", DEFAULT_BANNER_IMAGE);

  return (
    <main className="w-full bg-background text-foreground">
      <PageBanner
        title="Galeri Program & Kemudahan"
        image={bannerImage}
        breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Galeri" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <GalleryGrid />
      </div>
    </main>
  );
};

export default GaleriPage;
