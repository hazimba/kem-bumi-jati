import { Fraunces } from "next/font/google";
import { cn } from "@/lib/utils";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const halls = [
  { name: "Dewan Cemerlang", capacity: "300 pax", mobile: true },
  { name: "Dewan Gemilang", capacity: "120 pax", mobile: true },
  { name: "Dewan Bestari", capacity: "80 pax", mobile: true },
  { name: "Dewan Terbilang", capacity: "50 pax", mobile: true },
  { name: "Dewan Mini Hidayah", capacity: "30 pax", mobile: false },
];

const FacilitiesSection = () => {
  return (
    <section
      className={cn(fraunces.variable, "relative overflow-hidden bg-[#272635] py-20 h-1/2 px-6 sm:px-14 flex flex-col justify-center")}>
      <div className="pointer-events-none absolute  left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4A24C]/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="reveal-up text-xs tracking-[0.3em] uppercase text-[#D4A24C] font-semibold">Fasiliti</p>
        <h2 className="reveal-up mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white" style={{ animationDelay: "80ms" }}>
          Kemudahan Lengkap Untuk Setiap Program
        </h2>
        <p
          className="reveal-up mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300"
          style={{ animationDelay: "160ms" }}>
          5 dewan latihan lengkap dengan PA System, LCD projector, kerusi meja, pentas, pendingin hawa dan papan putih.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {halls.map((hall, idx) => (
            <div
              key={hall.name}
              style={{ animationDelay: `${240 + idx * 100}ms` }}
              className={cn(
                "reveal-hall group relative rounded-xl border border-[#D4A24C]/30 bg-white/[0.02] px-4 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#D4A24C]/80 hover:bg-[#D4A24C]/5 hover:shadow-[0_0_25px_-5px_rgba(212,162,76,0.5)]",
                !hall.mobile && "hidden sm:block"
              )}>
              <p className="font-serif text-sm sm:text-base font-semibold italic text-white">{hall.name}</p>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#D4A24C]">{hall.capacity}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
