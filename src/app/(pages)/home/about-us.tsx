import Image from "next/image";
import { Fraunces } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const AboutSection = () => {
  return (
    <section className={cn(fraunces.variable, "px-8 text-[#1A1A1A] sm:px-14 dark:text-[#F3EDE0]")}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 py-6 md:py-0">
        {/* IMAGE CONTAINER: Shows FIRST on mobile, SECOND (right side) on desktop */}
        <div className="relative reveal-right order-first md:order-last">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-xl md:aspect-[5/6] sm:aspect-square">
            <Image
              src="https://mishu.my/wp-content/uploads/2026/04/example-of-a-training-centre-in-malaysia-1024x1024.webp"
              alt="Training center and campers at Kem Bumi Jati"
              fill
              className="object-cover"
            />
          </div>

          <div
            className="absolute -bottom-6 -left-4 md:-left-8 z-10 flex md:h-36 md:w-36 flex-col items-center justify-center rounded-xl bg-brand p-4 text-center shadow-2xl reveal-pop"
            style={{ animationDelay: "320ms" }}>
            <span className="font-serif md:text-4xl text-3xl font-semibold leading-none text-brand-dark">30+</span>
            <span className="mt-2 text-xs font-medium uppercase tracking-wide text-brand-dark/90">
              Tahun <br /> Pengalaman
            </span>
          </div>
        </div>

        {/* TEXT CONTENT: Shows SECOND on mobile, FIRST (left side) on desktop */}
        <div className="order-last md:order-first">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#D4A24C]">About Us</p>
          <h2 className="mt-3 font-serif text-4xl italic leading-tight sm:text-5xl" style={{ animationDelay: "80ms" }}>
            More than a campground — a tradition
          </h2>
          <p className="mt-8 text-sm sm:text-sm leading-relaxed text-muted-foreground" style={{ animationDelay: "160ms" }}>
            Kem ini ditadbir dan diuruskan oleh syarikat ZH Warisan Holding Sdn. Bhd. Telah siap dibina pada tahun 1993, ia terletak di Batu
            7, Kampung Jalan Kebun, Seksyen 30, Shah Alam, Selangor.
            <br />
            <br />
            Kem ini beroperasi sepenuhnya pada bulan Disember 1993. Kem Bumi Jati merupakan pusat latihan dan kem motivasi profesional yang
            menyediakan persekitaran latihan yang kondusif, selesa dan lengkap untuk program pembangunan insan, kursus korporat, seminar,
            bengkel, kem pelajar dan team building.
          </p>
          <div className="flex flex-col px-0 pt-10">
            <Link prefetch={false} href="/about-us" className="flex items-center gap-2 font-medium h-12">
              <Button variant="link" size="lg" className="!px-0 hover:text-black cursor-pointer !text-brand-dark">
                Learn More About Us <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div
            className="mt-12 flex items-center gap-4 border-t border-neutral-200/60 pt-8 reveal-up dark:border-neutral-800"
            style={{ animationDelay: "240ms" }}>
            <Image
              src="https://img.magnific.com/premium-vector/kbj-creative-abstract-letter-initial-symbol-icon-vector-logo-design_1237311-4358.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Kem Bumi Jati Logo"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-neutral-100 dark:ring-neutral-800"
            />
            <div>
              <p className="font-serif text-lg font-semibold text-[#1A1A1A] dark:text-[#F3EDE0]">Kem Bumi Jati</p>
              <p className="text-xs text-neutral-500">Sejak Tahun 1993</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
