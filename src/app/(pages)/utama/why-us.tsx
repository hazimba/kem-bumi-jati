import { GoogleCalendarSync } from "@/components/google-calendar-sync";
import { FeaturesGrid } from "@/components/features-grid";
import { ProgramsSlider } from "@/components/programs-slider";
import { ClientsSlider } from "@/components/clients-slider";
import { getPrograms } from "@/lib/actions/programs";

type Client = { name: string; logo: string };

const clients: Client[] = [
  { name: "JAK Selangor", logo: "/assets/logo-zakat-selangor.png" },
  { name: "PASTI", logo: "/assets/logo-pasti.png" },
  { name: "HALMAN", logo: "/assets/logo-haluan.png" },
  { name: "IKRAM", logo: "/assets/logo-ikram.png" },
  { name: "PIKM", logo: "/assets/logo-pikm.png" },
  { name: "GMA", logo: "/assets/logo-gma.png" },
  { name: "DBKL", logo: "/assets/logo_dbkl.webp" },
  { name: "AL ISRA", logo: "/assets/logo_al_isra.png" },
  { name: "KOLEJ KOMUNITI", logo: "/assets/logo_kolej_komuniti.png" },
  { name: "MAAHAD", logo: "/assets/logo_maahad_tahfiz.png" },
  { name: "RELA", logo: "/assets/logo_rela.jpeg" },
  { name: "UITM", logo: "/assets/logo_uitm.png" },
  { name: "UPSI", logo: "/assets/logo_upsi.png" },
];

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

        <FeaturesGrid />

        <h2 className="mt-12 text-center text-xl font-extrabold uppercase text-neutral-800 dark:text-neutral-100 sm:text-3xl">Program</h2>

        <ProgramsSlider programs={programsData} />
        <div className="mt-16">
          <GoogleCalendarSync />
        </div>
        <h2 className="mt-16 text-center text-lg font-extrabold uppercase text-neutral-800 dark:text-neutral-100 sm:text-2xl">
          Organisasi Yang Telah Bersama Kami
        </h2>
        <ClientsSlider clients={clients} />
      </div>
    </section>
  );
};

export default WhyChooseSection;
