import { Home, Hotel, MapPin, Tent, Utensils, Waves, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { GoogleCalendarSync } from "@/components/google-calendar-sync";
import { ProgramsSlider } from "@/components/programs-slider";
import { getPrograms } from "@/lib/actions/programs";

type Feature = { label: string; icon: LucideIcon };
type Client = { name: string; logo: string };

const features: Feature[] = [
  { label: "Kemudahan lengkap", icon: Home },
  { label: "Penginapan asrama", icon: Hotel },
  { label: "Dewan makan", icon: Utensils },
  { label: "Kolam renang", icon: Waves },
  { label: "Susur Jalan Berbumbung", icon: Tent },
  { label: "Lokasi strategik", icon: MapPin },
];

const clients: Client[] = [
  { name: "JAK Selangor", logo: "/assets/logo-zakat-selangor.png" },
  { name: "PASTI", logo: "/assets/logo-pasti.png" },
  { name: "HALMAN", logo: "/assets/logo-haluan.png" },
  { name: "IKRAM", logo: "/assets/logo-ikram.png" },
  { name: "PIKM", logo: "/assets/logo-pikm.png" },
  { name: "GMA", logo: "/assets/logo-gma.png" },
];

const GREEN = "#1f6b3a";

const WhyChooseSection = async () => {
  const programsData = await getPrograms();

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold uppercase tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-4xl">
          Kenapa Pilih Kem Bumi Jati?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-base">
          Kem Bumi Jati menyediakan kemudahan lengkap untuk pelbagai jenis program termasuk kem akademik, kem motivasi, kursus, latihan
          organisasi dan aktiviti pembangunan diri.
        </p>

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

        <h2 className="mt-12 text-center text-xl font-extrabold uppercase text-neutral-800 dark:text-neutral-100 sm:text-3xl">Program</h2>

        <ProgramsSlider programs={programsData} />
        {/* Google Calendar component synced with personal Google Calendar */}
        <div className="mt-16">
          <GoogleCalendarSync />
        </div>
        <h2 className="mt-16 text-center text-lg font-extrabold uppercase text-neutral-800 dark:text-neutral-100 sm:text-2xl">
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
