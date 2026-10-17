import { Home, Hotel, MapPin, Tent, Utensils, Waves, type LucideIcon } from "lucide-react";
import Image from "next/image";

type Feature = { label: string; icon: LucideIcon };
type Program = { title: string; description: string; image: string };
type Client = { name: string; logo: string };

const features: Feature[] = [
  { label: "Kemudahan lengkap", icon: Home },
  { label: "Penginapan asrama", icon: Hotel },
  { label: "Dewan makan", icon: Utensils },
  { label: "Kolam renang", icon: Waves },
  { label: "Aktiviti outdoor", icon: Tent },
  { label: "Lokasi strategik", icon: MapPin },
];

const programs: Program[] = [
  {
    title: "Kem Akademik",
    description: "Program akademik, motivasi dan kecemerlangan pelajar.",
    image: "/assets/why-choose-1.jpg",
  },
  {
    title: "Team Building",
    description: "Kursus, latihan organisasi dan aktiviti kumpulan.",
    image: "/assets/why-choose-2.jpg",
  },
  {
    title: "Motivasi & Kepimpinan",
    description: "Program pembangunan diri dan kepimpinan.",
    image: "/assets/why-choose-3.jpg",
  },
];

const clients: Client[] = [
  { name: "JAK Selangor", logo: "https://placehold.co/160x80/png?text=JAK" },
  { name: "PASTI", logo: "/assets/logo-pasti.png" },
  { name: "HALMAN", logo: "https://placehold.co/160x80/png?text=HALMAN" },
  { name: "IKRAM", logo: "/assets/logo-ikram.png" },
  { name: "PIKM", logo: "/assets/logo-pikm.png" },
  { name: "GMA", logo: "https://placehold.co/160x80/png?text=GMA" },
];

const GREEN = "#1f6b3a";

const WhyChooseSection = () => {
  return (
    <section className="w-full bg-white py-12 dark:bg-neutral-950 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-center text-2xl font-extrabold uppercase tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-4xl">
          Kenapa Pilih Kem Bumi Jati?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-base">
          Kem Bumi Jati menyediakan kemudahan lengkap untuk pelbagai jenis program termasuk kem akademik, kem motivasi, kursus, latihan
          organisasi dan aktiviti pembangunan diri.
        </p>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-3 lg:grid-cols-6">
          {features.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl bg-neutral-100 px-2 py-5 text-center shadow-sm dark:bg-neutral-900">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-neutral-800">
                <Icon className="h-7 w-7" style={{ color: GREEN }} aria-hidden="true" />
              </span>
              <span className="text-xs font-bold leading-tight text-neutral-800 dark:text-neutral-100">{label}</span>
            </div>
          ))}
        </div>

        {/* Programs */}
        <h2 className="mt-12 text-center text-xl font-extrabold uppercase text-neutral-800 dark:text-neutral-100 sm:text-3xl">
          Pakej Program
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {programs.map(({ title, description, image }) => (
            <div key={title} className="flex flex-col overflow-hidden rounded-2xl bg-neutral-100 pb-5 shadow-sm dark:bg-neutral-900">
              <div className="relative h-40 w-full overflow-hidden rounded-xl">
                <Image src={image} alt={title} fill unoptimized className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col px-4 pt-4">
                <h3 className="min-h-[3.5rem] text-lg font-bold leading-snug text-neutral-800 dark:text-neutral-100">{title}</h3>
                <p className="mt-1 flex-1 text-sm leading-snug text-neutral-500 dark:text-neutral-400">{description}</p>
                <button
                  type="button"
                  className="mt-5 w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GREEN }}>
                  Lihat Pakej
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clients */}
        <h2 className="mt-12 text-center text-lg font-extrabold uppercase text-neutral-800 dark:text-neutral-100 sm:text-2xl">
          Organisasi Yang Telah Bersama Kami
        </h2>
        <ul className="mt-6 grid grid-cols-3 items-center gap-4 lg:grid-cols-6">
          {clients.map(({ name, logo }) => (
            <li key={name} className="flex h-16 items-center justify-center rounded-lg bg-white p-2 dark:bg-neutral-100">
              <Image src={logo} alt={name} width={120} height={60} unoptimized className="max-h-14 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseSection;
