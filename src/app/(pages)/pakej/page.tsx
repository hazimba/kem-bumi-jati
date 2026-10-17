import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, GraduationCap, UserRound, Users, type LucideIcon } from "lucide-react";
import PageBanner from "@/components/page-banner";

export const metadata: Metadata = {
  title: "Pakej Program | Kem Bumi Jati",
  description: "Pakej Kem Akademik, Team Building serta Motivasi & Kepimpinan.",
};

const BANNER_IMAGE = "https://placehold.co/1600x500/png?text=Banner";

type Pakej = {
  slug: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  /** Card colours: light mode + slightly deeper tone for dark mode */
  className: string;
};

const pakej: Pakej[] = [
  {
    slug: "kem-akademik",
    title: "Pakej Kem Akademik",
    description: "Sesuai untuk sekolah, pelajar dan program kecemerlangan.",
    items: ["Kem akademik", "Motivasi pelajar", "Program SPM", "Kursus akademik"],
    icon: GraduationCap,
    className: "bg-[#17607a] dark:bg-[#0f4357]",
  },
  {
    slug: "team-building",
    title: "Pakej Team Building",
    description: "Sesuai untuk syarikat, organisasi dan agensi kerajaan.",
    items: ["Aktiviti berkumpulan", "Latihan organisasi", "Program pembangunan", "Team building"],
    icon: Users,
    className: "bg-[#a67c2e] dark:bg-[#7a5a1f]",
  },
  {
    slug: "motivasi-kepimpinan",
    title: "Pakej Motivasi & Kepimpinan",
    description: "Sesuai untuk pelajar, belia dan organisasi.",
    items: ["Motivasi diri", "Kepimpinan", "Pembangunan diri", "Kursus & latihan"],
    icon: UserRound,
    className: "bg-[#c4533a] dark:bg-[#92392a]",
  },
];

const PakejPage = () => {
  return (
    <main className="w-full bg-background text-foreground">
      <PageBanner title="Pakej Program" image={BANNER_IMAGE} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Pakej" }]} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {pakej.map(({ slug, title, description, items, icon: Icon, className }) => (
            <li
              key={slug}
              className={`flex flex-col rounded-2xl p-6 text-white shadow-md ring-1 ring-black/5 dark:ring-white/10 ${className}`}>
              <Icon className="mx-auto h-14 w-14" aria-hidden="true" />
              <h3 className="mt-4 text-center text-xl font-bold leading-snug">{title}</h3>
              <p className="mx-auto mt-3 max-w-[16rem] text-center text-sm leading-snug text-white/85">{description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/pakej/${slug}`}
                className="mt-6 block rounded-lg bg-white py-3 text-center text-sm font-semibold text-neutral-900 transition-colors hover:bg-white/90">
                Lihat Butiran
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default PakejPage;
