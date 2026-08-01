import LocationMap from "./location-map-loader";
import { MapPin, ExternalLink, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fraunces } from "next/font/google";

const ADDRESS = "Lot 3319, Jalan Kem Bumi Jati, Batu 7, Jalan Kebun, Seksyen 30, 40460 Shah Alam, Selangor Darul Ehsan.";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Kem+Bumi+Jati+Shah+Alam";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

interface LocationSectionProps {
  showContactDetails?: boolean;
  className?: string;
}

const LocationSection = ({ showContactDetails = false, className }: LocationSectionProps) => {
  return (
    <section className={cn(fraunces.variable, "relative overflow-hidden bg-white", className)}>
      <div className="pointer-events-none absolute left-1/2 top-0 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pb-10 text-center sm:px-14">
        <p className="reveal-wipe text-xs tracking-[0.3em] uppercase text-[#D4A24C] font-semibold">Lokasi</p>

        <h2
          className="reveal-wipe mt-3 font-fraunces text-3xl sm:text-4xl md:text-5xl text-brand-dark mt-3 font-serif text-4xl italic leading-tight sm:text-5xl"
          style={{ animationDelay: "80ms" }}>
          Lokasi Strategik Di Shah Alam
        </h2>

        <p
          className="reveal-wipe mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-600"
          style={{ animationDelay: "160ms" }}>
          {ADDRESS}
        </p>

        {showContactDetails && (
          <div className="reveal-wipe mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3" style={{ animationDelay: "220ms" }}>
            <div className="flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <Phone className="h-4 w-4 shrink-0 text-brand" />
              <span className="text-sm text-brand-dark">03-1234 5678</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <Mail className="h-4 w-4 shrink-0 text-brand" />
              <span className="text-sm text-brand-dark">info@kembumijati.com.my</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <Clock className="h-4 w-4 shrink-0 text-brand" />
              <span className="text-sm text-brand-dark">9:00 AM – 6:00 PM</span>
            </div>
          </div>
        )}
      </div>

      <div className="reveal-map relative mx-auto max-w-6xl px-10 md:px-0 pb-16 sm:px-6">
        <div className="relative h-[320px] sm:h-[400px] md:h-[450px] w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
          <LocationMap />
          <Link
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 z-[400] flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-brand-dark shadow-md transition-all hover:bg-white sm:top-4 sm:right-4 sm:px-4 sm:py-2">
            Open in Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <div className="absolute bottom-3 right-3 z-[400] flex items-center gap-1.5 rounded-full bg-brand-dark/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium text-white shadow-md sm:bottom-4 sm:right-4 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs">
            <MapPin className="h-3.5 w-3.5 text-brand-light" />
            <span className="truncate max-w-[140px] sm:max-w-none">Kem Bumi Jati, Shah Alam</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
