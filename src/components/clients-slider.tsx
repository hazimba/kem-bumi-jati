"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

export function ClientsSlider({ clients }: { clients: { name: string; logo: string }[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false }),
  ]);

  if (!clients || clients.length === 0) return null;

  return (
    <div className="mt-6 mx-2 overflow-hidden select-none" ref={emblaRef}>
      <div className="flex gap-4">
        {clients.map((client) => (
          <div key={client.name} className="min-w-[140px] sm:min-w-[180px] shrink-0 px-0">
            <div className="flex h-16 items-center justify-center rounded-lg bg-white p-2 dark:bg-neutral-100">
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={60}
                unoptimized
                className="max-h-14 w-auto object-contain pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
