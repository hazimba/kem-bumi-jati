"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { type ProgramItem } from "@/lib/actions/programs";

export function ProgramsSlider({ programs }: { programs: ProgramItem[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    AutoScroll({
      speed: 0.4,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  if (!programs || programs.length === 0) return null;

  return (
    <div className="mt-6 overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={emblaRef}>
      <div className="flex -ml-4">
        {programs.map((item) => (
          <div key={item.id} className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/3 pl-4">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-neutral-100 pb-5 shadow-sm dark:bg-neutral-900">
              <div className="relative h-40 w-full overflow-hidden rounded-xl">
                <Image src={item.image_url} alt={item.title} fill unoptimized className="object-cover pointer-events-none" />
              </div>
              <div className="flex flex-1 flex-col px-4 pt-4">
                <h3 className="min-h-[3.5rem] text-lg font-bold leading-snug text-neutral-800 dark:text-neutral-100">{item.title}</h3>
                <p className="mt-1 flex-1 text-sm leading-snug text-neutral-500 dark:text-neutral-400">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
