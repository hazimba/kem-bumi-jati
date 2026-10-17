import type { Metadata } from "next";
import PageBanner from "@/components/page-banner";
import GalleryGrid from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Galeri | Kem Bumi Jati",
  description: "Galeri program dan kemudahan Kem Bumi Jati.",
};

const BANNER_IMAGE = "https://placehold.co/1600x500/png?text=Banner";

const GaleriPage = () => {
  return (
    <main className="w-full bg-background text-foreground">
      <PageBanner
        title="Galeri Program & Kemudahan"
        image={BANNER_IMAGE}
        breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Galeri" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <GalleryGrid />
      </div>
    </main>
  );
};

export default GaleriPage;
