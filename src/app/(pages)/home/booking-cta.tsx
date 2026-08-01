import Image from "next/image";
import { Phone, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingCalendarPanel } from "@/components/booking-calendar-panel";

interface BookingCtaSectionProps {
  className?: string;
}

const BookingCtaSection = ({ className }: BookingCtaSectionProps) => {
  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="https://infinity.edu.my/wp-content/uploads/2026/01/Gemini_Generated_Image_ldxghcldxghcldxg-1.png"
          alt="Kem Bumi Jati"
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative mx-auto flex min-h-[640px] max-w-6xl items-center justify-center px-4 py-20 sm:px-8">
        <div className="reveal-card grid w-full grid-cols-1 overflow-hidden rounded-2xl bg-[#FBEFD8] shadow-2xl md:grid-cols-2">
          {/* Left: text + CTA */}
          <div className="flex flex-col items-start justify-center gap-4 p-8 sm:p-12">
            <div className="flex items-center gap-2 text-sm text-brand-dark">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <span className="font-medium">4.9</span>
              <span className="text-neutral-400">|</span>
              <span className="text-neutral-500">500+ Program Selesai</span>
            </div>

            <h2 className="text-4xl text-brand-dark sm:text-5xl">Mulakan Program Anda</h2>

            <p className="max-w-sm text-sm text-neutral-600 sm:text-base">
              Tempah tarikh latihan anda di Kem Bumi Jati dan biarkan pengalaman yang bermakna menanti peserta anda.
            </p>

            <a
              href="tel:+60312345678"
              className="mt-2 flex items-center gap-3 rounded-lg bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]">
              Hubungi Kami Untuk Maklumat
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/40">
                <Phone className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <div className="flex items-center justify-center border-t border-brand-dark/10 bg-white/40 p-6 md:border-l md:border-t-0 sm:p-8">
            <BookingCalendarPanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCtaSection;
