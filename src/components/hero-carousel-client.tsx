"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/navigation-bar";
import { cn } from "@/lib/utils";
import { slides } from "@/lib/constant";

const AUTOPLAY_MS = 6500;
const SWIPE_THRESHOLD = 50;

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handler = () => setReducedMotion(query.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => goTo(index + 1), [index, goTo]);
  const goPrev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [goNext, isPaused, reducedMotion]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
    setIsPaused(false);
  };

  const slide = slides[index];

  return (
    <section
      ref={containerRef}
      className={cn("relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-[#16261C]")}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Kem Bumi Jati highlights">
      {/* Render all slides into DOM but toggle opacity seamlessly */}
      {slides.map((s, i) => {
        const isActive = i === index;

        return (
          <div
            key={s.heading || i}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out will-change-opacity",
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            )}
            aria-hidden={!isActive}>
            <Image
              src={s.image}
              alt={s.heading || "Kem Bumi Jati"}
              fill
              priority={i === 0}
              // FIX: Force high priority for LCP image optimization
              {...(i === 0 ? { fetchPriority: "high" } : {})}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={75}
              className={cn(
                "object-cover transition-transform ease-linear will-change-transform",
                isActive && !reducedMotion && "scale-105 duration-[7000ms]",
                !isActive && "scale-100"
              )}
            />
            <div className={cn("absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent", s.tint)} />
          </div>
        );
      })}

      <div className="absolute inset-x-0 top-0 z-50">
        <NavigationBar variant="overlay" />
      </div>

      <div className="relative z-20 flex h-full items-center px-8 sm:px-14 max-w-7xl mx-auto">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-xl" aria-live="polite">
          <p className="mb-3 text-xs tracking-[0.25em] uppercase text-[#D4A24C]">{slide.eyebrow}</p>
          <h2 className="font-serif text-4xl sm:text-5xl italic leading-tight text-[#F3EDE0]">{slide.heading}</h2>
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#F3EDE0]/80">{slide.description}</p>
          {slide.cta && (
            <Button asChild className="mt-8 bg-secondary text-primary py-4 px-6 border hover:bg-[#D4A24C]/90">
              <Link href={slide.cta.href}>{slide.cta.label}</Link>
            </Button>
          )}
        </motion.div>
      </div>

      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-10 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 p-2 text-[#F3EDE0] transition hover:bg-white/10 sm:flex">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-10 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 p-2 text-[#F3EDE0] transition hover:bg-white/10 sm:flex">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-9 left-8 z-20 flex items-end gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "w-[10px] rounded-full transition-all duration-300",
              i === index ? "h-9 bg-[#D4A24C]" : "h-4 bg-[#F3EDE0]/40 hover:bg-[#F3EDE0]/70"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
