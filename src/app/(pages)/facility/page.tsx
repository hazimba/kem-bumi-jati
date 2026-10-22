import type { Metadata } from "next";
import Image from "next/image";
import { BedDouble, Briefcase, Moon, ParkingSquare, PersonStanding, Presentation, Utensils, Waves, type LucideIcon } from "lucide-react";
import PageBanner from "@/components/page-banner";

export const metadata: Metadata = {
  title: "Fasiliti Utama | Kem Bumi Jati",
  description: "Kemudahan lengkap untuk memastikan program anda berjalan dengan lancar dan selesa.",
};

const GREEN = "#1f6b3a";
const BANNER_IMAGE = "https://placehold.co/1600x500/png?text=Banner";

type Facility = { title: string; description: string; image: string; icon: LucideIcon };

const facilities: Facility[] = [
  {
    title: "5 Dewan Kuliah",
    description: "Sesuai untuk seminar, ceramah, kursus dan aktiviti berkumpulan.",
    image: "https://placehold.co/800x500/png?text=Dewan+Kuliah",
    icon: Presentation,
  },
  {
    title: "Asrama Lelaki & Perempuan",
    description: "Penginapan berasingan yang selesa untuk peserta.",
    image: "https://placehold.co/800x500/png?text=Asrama",
    icon: BedDouble,
  },
  {
    title: "Dewan Makan",
    description: "Kemudahan dewan makan untuk peserta program.",
    image: "https://placehold.co/800x500/png?text=Dewan+Makan",
    icon: Utensils,
  },
  {
    title: "Bilik Urusetia",
    description: "Ruang khusus untuk urusan pengurusan dan penyelarasan program.",
    image: "https://placehold.co/800x500/png?text=Bilik+Urusetia",
    icon: Briefcase,
  },
  {
    title: "Surau",
    description: "Kemudahan surau untuk kegunaan peserta dan urusetia.",
    image: "https://placehold.co/800x500/png?text=Surau",
    icon: Moon,
  },
  {
    title: "Parking & Padang Kawad",
    description: "Kawasan lapang untuk aktiviti kawad, perhimpunan dan aktiviti berkumpulan.",
    image: "https://placehold.co/800x500/png?text=Padang+Kawad",
    icon: ParkingSquare,
  },
  {
    title: "Kolam Renang",
    description: "Kemudahan kolam renang untuk aktiviti rekreasi.",
    image: "https://placehold.co/800x500/png?text=Kolam+Renang",
    icon: Waves,
  },
  {
    title: "Kawasan Berhalangan / Obstacle",
    description: "Ruang aktiviti mencabar untuk program team building dan kepimpinan.",
    image: "https://placehold.co/800x500/png?text=Obstacle",
    icon: PersonStanding,
  },
];

const FasilitiPage = () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-950">
      <PageBanner title="Fasiliti Utama" image={BANNER_IMAGE} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Fasiliti" }]} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <p className="max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
          Kemudahan lengkap untuk memastikan program anda berjalan dengan lancar dan selesa.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {facilities.map(({ title, description, image, icon: Icon }) => (
            <li
              key={title}
              className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10">
              <div className="relative aspect-[16/10] w-full">
                <Image src={image} alt={title} fill unoptimized className="object-cover" />
              </div>
              <div className="flex items-start gap-2.5 p-3 sm:gap-3 sm:p-4">
                <Icon className="mt-0.5 h-7 w-7 shrink-0 sm:h-8 sm:w-8" style={{ color: GREEN }} aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold leading-snug text-neutral-800 dark:text-neutral-100 sm:text-base">{title}</h3>
                  <p className="mt-1 text-xs leading-snug text-neutral-500 dark:text-neutral-400 sm:text-sm">{description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default FasilitiPage;