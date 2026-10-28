import type { Metadata } from "next";
import Image from "next/image";
import { Check, Eye, Mountain, Target } from "lucide-react";
import PageBanner from "@/components/page-banner";
import ImagePreviewDialog from "@/components/image-preview-dialog";

export const metadata: Metadata = {
  title: "Latar Belakang | Kem Bumi Jati",
  description: "Mengenai Kem Bumi Jati, objektif, visi dan misi.",
  alternates: {
    canonical: "/latar-belakang",
  },
};

const GREEN = "#1f6b3a";
const ORANGE = "#D4A24C";

const BANNER_IMAGE = "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000144361.jpg";
const ABOUT_IMAGE =
  "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/IMG_20260803_142041.jpg";
const MAP_IMAGE =
  "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/LAYOUT%20KEM%202026.jpg";
const VIDEO_SRC = "https://www.youtube.com/embed/wdxeBjvC2FU";
const VIDEO_POSTER = "https://img.youtube.com/vi/wdxeBjvC2FU/maxresdefault.jpg";

const objektif = [
  "Menyediakan lokasi yang selesa dan sesuai untuk program berkumpulan.",
  "Menyediakan kemudahan latihan dan aktiviti yang lengkap.",
  "Membantu penganjur melaksanakan program dengan lebih tersusun.",
  "Menyediakan persekitaran yang kondusif.",
];

const LatarBelakangPage = async () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-950">
      <PageBanner title="Latar Belakang" image={BANNER_IMAGE} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Latar Belakang" }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Mengenai */}
        <section className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.5fr_1fr] md:gap-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-3xl">Mengenai Kem Bumi Jati</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
              Kem Bumi Jati merupakan sebuah pusat latihan dan aktiviti berkumpulan yang menyediakan kemudahan bagi pelbagai program seperti
              kem akademik, motivasi, kursus, latihan organisasi, seminar dan aktiviti pembangunan diri.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm">
            <Image src={ABOUT_IMAGE} alt="Kem Bumi Jati" fill unoptimized className="object-cover" />
          </div>
        </section>

        {/* Objektif / Visi / Misi */}
        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-neutral-100 p-6 shadow-sm dark:bg-neutral-900">
            <Target className="h-10 w-10" style={{ color: GREEN }} aria-hidden="true" />
            <h3 className="mt-3 text-xl font-bold text-neutral-800 dark:text-neutral-100">Objektif</h3>
            <ul className="mt-3 space-y-3">
              {objektif.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-snug text-neutral-600 dark:text-neutral-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ORANGE }} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl bg-neutral-100 p-6 shadow-sm dark:bg-neutral-900">
            <Eye className="h-10 w-10" style={{ color: GREEN }} aria-hidden="true" />
            <h3 className="mt-3 text-xl font-bold text-neutral-800 dark:text-neutral-100">Visi</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Menjadi pusat latihan dan aktiviti berkumpulan pilihan utama bagi organisasi, institusi pendidikan dan agensi di Selangor.
            </p>
          </article>

          <article className="rounded-2xl bg-neutral-100 p-6 shadow-sm dark:bg-neutral-900">
            <Mountain className="h-10 w-10" style={{ color: GREEN }} aria-hidden="true" />
            <h3 className="mt-3 text-xl font-bold text-neutral-800 dark:text-neutral-100">Misi</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Menyediakan kemudahan, perkhidmatan dan pengalaman program yang berkualiti dalam persekitaran yang selamat, selesa dan
              kondusif.
            </p>
          </article>
        </section>

        {/* Peta & Video */}
        <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[1.5fr_1fr]">
          {/* <div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Peta &amp; Layout Kem</h3>
            <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm">
              <Image src={MAP_IMAGE} alt="Peta dan layout Kem Bumi Jati" fill unoptimized className="object-cover" />
            </div>
            <a
              href={MAP_IMAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: GREEN }}>
              Lihat Dalam Saiz Penuh
            </a>
          </div> */}
          <ImagePreviewDialog
            src={MAP_IMAGE}
            alt="Peta dan layout Kem Bumi Jati"
            title="Peta & Layout Kem"
            // buttonLabel="Lihat Peta & Layout Kem"
          />

          <div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Video Masuk Kem</h3>
            <div className="mt-3 overflow-hidden rounded-xl bg-black shadow-sm">
              <iframe
                src={VIDEO_SRC}
                title="Kem Bumi Jati Video"
                className="aspect-[4/3] w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LatarBelakangPage;
