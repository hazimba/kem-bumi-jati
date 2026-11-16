import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import PageBanner from "@/components/page-banner";
import { getPageBannerBySlug } from "@/lib/actions/page-banners";
import AnimatedItem from "@/components/animated-item";

export const metadata: Metadata = {
  title: "Hubungi Kem Bumi Jati | Tempahan Kem di Shah Alam",
  description:
    "Hubungi Kem Bumi Jati di Jalan Kebun, Shah Alam, Selangor untuk pertanyaan pakej kem, program motivasi, kemudahan, tarikh dan tempahan melalui WhatsApp atau email.",
  alternates: {
    canonical: "/hubungi-kami",
  },
};

const GREEN = "#1f6b3a";

const DEFAULT_BANNER = "https://images.kembumijati.com/kem_bumi_jati_header_background_img/IMG_20260108_123242.jpg";

const SIDE_IMAGE = "https://images.kembumijati.com/kem_bumi_jati_header_background_img/1000211449.jpg";

const WHATSAPP_DISPLAY = "+60 11-1461 5206";
const WHATSAPP_URL = "https://wa.me/601114615206";
const EMAIL = "info@kembumijati.com";

const HubungiKamiPage = async () => {
  const bannerImage = await getPageBannerBySlug("hubungi-kami", DEFAULT_BANNER);

  return (
    <main className="w-full bg-white pt-26 dark:bg-neutral-950">
      <PageBanner title="Hubungi Kami" image={bannerImage} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Hubungi Kami" }]} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section aria-labelledby="hubungi-heading" className="mb-8 max-w-7xl sm:mb-10">
          <h2 id="hubungi-heading" className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-3xl">
            Hubungi Kami untuk Tempahan Kem Bumi Jati
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
            Ada pertanyaan tentang program atau tempahan kem? Hubungi pasukan Kem Bumi Jati untuk mendapatkan maklumat lanjut mengenai pakej
            program, tarikh, kemudahan dan urusan tempahan. Kami sedia membantu anda merancang program yang sesuai dengan keperluan
            organisasi, sekolah atau kumpulan anda.
          </p>
        </section>

        <section aria-label="Maklumat perhubungan Kem Bumi Jati" className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr]">
          <ul className="space-y-8">
            {/* WhatsApp */}
            <AnimatedItem as="li" index={0} direction="up" className="flex items-start gap-4">
              <MessageCircle className="mt-1 h-10 w-10 shrink-0" style={{ color: GREEN }} aria-hidden="true" />

              <div>
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">WhatsApp</h3>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block text-base text-neutral-600 hover:underline dark:text-neutral-400">
                  {WHATSAPP_DISPLAY}
                </a>

                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Klik nombor WhatsApp untuk berbual dengan kami.</p>
              </div>
            </AnimatedItem>

            {/* Email */}
            <AnimatedItem as="li" index={1} direction="up" className="flex items-start gap-4">
              <Mail className="mt-1 h-10 w-10 shrink-0" style={{ color: GREEN }} aria-hidden="true" />

              <div>
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Email</h3>

                <a href={`mailto:${EMAIL}`} className="mt-0.5 block text-base text-neutral-600 hover:underline dark:text-neutral-400">
                  {EMAIL}
                </a>
              </div>
            </AnimatedItem>

            {/* Address */}
            <AnimatedItem as="li" index={2} direction="up" className="flex items-start gap-4">
              <MapPin className="mt-1 h-10 w-10 shrink-0" style={{ color: GREEN }} aria-hidden="true" />

              <div>
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Alamat</h3>

                <p className="mt-0.5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Lot 3319 Jalan Kem Bumi Jati, Batu 7, Jalan Kebun, 40460 Shah Alam, Selangor
                </p>
              </div>
            </AnimatedItem>
          </ul>

          {/* Image */}
          <AnimatedItem
            as="div"
            direction="right"
            duration={0.8}
            distance={30}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-sm">
            <Image
              src={SIDE_IMAGE}
              alt="Pintu masuk Kem Bumi Jati di Jalan Kebun, Shah Alam"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </AnimatedItem>
        </section>
      </div>
    </main>
  );
};

export default HubungiKamiPage;
