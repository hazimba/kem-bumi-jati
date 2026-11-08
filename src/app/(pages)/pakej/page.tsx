import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, GraduationCap, UserRound, Users, type LucideIcon } from "lucide-react";
import PageBanner from "@/components/page-banner";
import WorkInProgress from "@/components/work-in-progress";
import { getPageBannerBySlug } from "@/lib/actions/page-banners";

export const metadata: Metadata = {
  title: "Program",
  description: "Pakej Kem Akademik, Team Building serta Motivasi & Kepimpinan.",
};

const DEFAULT_BANNER_IMAGE = "https://placehold.co/1600x500/png?text=Banner";

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

const PakejPage = async () => {
  const bannerImage = await getPageBannerBySlug("pakej", DEFAULT_BANNER_IMAGE);

  return (
    <div className="w-full">
      <PageBanner title="Program" image={bannerImage} breadcrumbs={[{ label: "Utama", href: "/" }]} />

      <WorkInProgress />
    </div>
  );
};

export default PakejPage;