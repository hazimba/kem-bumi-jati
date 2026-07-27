import Image from "next/image";
import { Fraunces } from "next/font/google";
import { cn } from "@/lib/utils";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const AboutSection = () => {
  return (
    <section className={cn(fraunces.variable, "py-20 px-8 sm:px-14")}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div className="reveal-left">
          <p className="text-xs tracking-[0.25em] uppercase text-[#D4A24C]">About Us</p>
          <h2 className="mt-3 font-serif text-3xl italic leading-tight text-[#16261C] dark:text-[#F3EDE0] sm:text-4xl">
            More than a campground — a tradition
          </h2>
          <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            Kem ini ditadbir dan diuruskan oleh syarikat ZH Warisan Holding.Sdn.Bhd. Telah siap dibina pada tahun 1993 ini terletak di Batu
            7, Kampung Jalan Kebun, Seksyen 30, Shah Alam,Selangor. <br /> <br /> Kem ini beroperasi sepenuhnya pada bulan Disember 1993.
            Kem Bumi Jati merupakan pusat latihan dan kem motivasi profesional di bawah pengurusan ZH Warisan Holdings Sdn. Bhd. yang telah
            beroperasi sejak tahun 1993. Terletak di Shah Alam, Selangor, kami menyediakan persekitaran latihan yang kondusif, selesa dan
            lengkap untuk program pembangunan insan, kursus korporat, seminar, bengkel, kem pelajar dan team building.
          </p>
          <div className="mt-8 flex items-center gap-3 border-t pt-6 reveal-up" style={{ animationDelay: "150ms" }}>
            <Image
              src="https://img.magnific.com/premium-vector/kbj-creative-abstract-letter-initial-symbol-icon-vector-logo-design_1237311-4358.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Kem Bumi Jati Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <p className="font-serif text-base text-[#16261C] dark:text-[#F3EDE0]">Kem Bumi Jati</p>
              <p className="text-xs text-muted-foreground">Since 1973</p>
            </div>
          </div>
        </div>

        <div className="relative reveal-right">
          <div className="relative h-80 w-9/10 overflow-hidden rounded-2xl sm:h-[26rem]">
            <Image src="/assets/training-center.webp" alt="Campers at Kem Bumi Jati" fill className="object-cover" />
          </div>

          <div
            className="absolute md:-bottom-8 -bottom-4 md:-left-8 -left-4 flex h-32 w-32 flex-col items-center justify-center rounded-xl bg-[#D4A24C] text-center shadow-lg sm:h-36 sm:w-36 reveal-pop"
            style={{ animationDelay: "250ms" }}>
            <span className="font-serif text-3xl text-[#16261C] sm:text-4xl">30+</span>
            <span className="mt-1 text-[11px] uppercase tracking-wide text-[#16261C]/80">Pengalaman</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
