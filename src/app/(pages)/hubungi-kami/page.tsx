import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import PageBanner from "@/components/page-banner";

export const metadata: Metadata = {
  title: "Hubungi Kami | Kem Bumi Jati",
  description: "Hubungi pasukan Kem Bumi Jati untuk maklumat berkaitan pakej, tarikh, kemudahan dan tempahan.",
};

const GREEN = "#1f6b3a";

const BANNER_IMAGE = "https://placehold.co/1600x500/png?text=Banner";
const SIDE_IMAGE = "https://placehold.co/700x800/png?text=Kem+Bumi+Jati";

const WHATSAPP_DISPLAY = "+60 12-345 6789";
const WHATSAPP_URL = "https://wa.me/60123456789";
const EMAIL = "info@kembumijati.com";

const HubungiKamiPage = () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-950">
      <PageBanner title="Hubungi Kami" image={BANNER_IMAGE} breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Hubungi Kami" }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-2xl">Ada pertanyaan tentang program anda?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
          Hubungi pasukan Kem Bumi Jati untuk mendapatkan maklumat berkaitan pakej, tarikh, kemudahan dan tempahan.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr]">
          {/* Contact list */}
          <ul className="space-y-8">
            <li className="flex items-start gap-4">
              <MessageCircle className="mt-1 h-10 w-10 shrink-0" style={{ color: GREEN }} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">WhatsApp</p>
                <p className="mt-0.5 text-base text-neutral-600 dark:text-neutral-400">{WHATSAPP_DISPLAY}</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GREEN }}>
                  WhatsApp Kami
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Mail className="mt-1 h-10 w-10 shrink-0" style={{ color: GREEN }} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Email</p>
                <a href={`mailto:${EMAIL}`} className="mt-0.5 block text-base text-neutral-600 hover:underline dark:text-neutral-400">
                  {EMAIL}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <MapPin className="mt-1 h-10 w-10 shrink-0" style={{ color: GREEN }} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Alamat</p>
                <p className="mt-0.5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Kem Bumi Jati, Jalan Kebun,
                  <br />
                  Shah Alam, Selangor
                </p>
              </div>
            </li>
          </ul>

          {/* Image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-sm">
            <Image src={SIDE_IMAGE} alt="Pintu masuk Kem Bumi Jati" fill unoptimized className="object-cover" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HubungiKamiPage;
