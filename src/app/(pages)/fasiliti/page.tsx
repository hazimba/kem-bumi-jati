import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Briefcase,
  Expand,
  ImageIcon,
  Moon,
  ParkingSquare,
  PersonStanding,
  Presentation,
  Utensils,
  Waves,
  type LucideIcon,
} from "lucide-react";
import PageBanner from "@/components/page-banner";
import { getFacilityTypes } from "@/lib/quaries/faciliti";
import { getPageBannerBySlug } from "@/lib/actions/page-banners";
import AnimatedItem from "@/components/animated-item";
import ExpandableText from "@/components/expandable-text";

export const metadata: Metadata = {
  title: "Fasiliti Kem Latihan di Shah Alam | Kem Bumi Jati",
  description:
    "Terokai fasiliti Kem Bumi Jati di Shah Alam, Selangor. Kemudahan asrama, dewan kuliah, dewan makan, surau, kolam renang dan kawasan latihan.",
  alternates: {
    canonical: "/fasiliti",
  },
};

const GREEN = "#1f6b3a";
const DEFAULT_BANNER = "https://images.kembumijati.com/kem_bumi_jati_header_background_img/1000211396.jpg";

const ICONS: Record<string, LucideIcon> = {
  "dewan-kuliah": Presentation,
  asrama: BedDouble,
  "dewan-makan": Utensils,
  "bilik-urusetia": Briefcase,
  surau: Moon,
  "parking-padang-kawad": ParkingSquare,
  "kolam-renang": Waves,
  obstacle: PersonStanding,
};

const FasilitiPage = async () => {
  const facilities = await getFacilityTypes();
  const bannerImage = await getPageBannerBySlug("fasiliti", DEFAULT_BANNER);

  return (
    <main className="w-full bg-white dark:bg-neutral-950 pt-26">
      <PageBanner title="Fasiliti Utama" image={bannerImage} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Fasiliti" }]} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="max-w-7xl">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-3xl">
            Fasiliti & Kemudahan Kem Bumi Jati di Shah Alam
          </h1>

          <ExpandableText
            maxWords={20}
            className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg"
            text="Kem Bumi Jati menyediakan pelbagai kemudahan untuk program motivasi, kem kepimpinan, latihan berkumpulan dan aktiviti
            pembangunan diri. Terletak di Jalan Kebun, Shah Alam, kem kami dilengkapi dengan asrama, dewan kuliah, dewan makan, surau, kolam
            renang dan kawasan latihan bagi menyokong kelancaran program serta keselesaan peserta."
          />
        </section>

        {facilities.length === 0 ? (
          <p className="mt-10 text-center text-neutral-500">Tiada fasiliti untuk dipaparkan.</p>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {facilities.map(({ id, slug, label, description, cover_url, count }, index) => {
              const Icon = ICONS[slug] ?? ImageIcon;

              return (
                <AnimatedItem
                  key={id}
                  as="li"
                  index={index}
                  staggerDelay={0.1}
                  direction="up"
                  duration={1}
                  distance={20}
                  className="h-full">
                  <Link
                    href={`/fasiliti/${slug}`}
                    className="group block h-full overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-neutral-900 dark:ring-white/10">
                    <div className="relative aspect-[16/10] w-full bg-neutral-100 dark:bg-neutral-800">
                      {cover_url ? (
                        <Image
                          src={cover_url}
                          alt={label}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-neutral-400">
                          <ImageIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
                      )}

                      {count > 0 && (
                        <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                          {count} gambar
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-2.5 p-3 sm:gap-3 sm:p-4">
                      <Icon className="mt-0.5 h-7 w-7 shrink-0 sm:h-8 sm:w-8" style={{ color: GREEN }} aria-hidden="true" />
                      <div>
                        <h2 className="text-sm font-bold leading-snug text-neutral-800 dark:text-neutral-100 sm:text-base">{label}</h2>
                        {description && (
                          <p className="mt-1 text-xs leading-snug text-neutral-500 dark:text-neutral-400 sm:text-sm">{description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </AnimatedItem>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
};

export default FasilitiPage;
