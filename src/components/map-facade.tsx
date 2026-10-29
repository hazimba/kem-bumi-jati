"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

type MapFacadeProps = {
  embedUrl: string;
  title: string;
  /** Optional screenshot of the map (e.g. a .jpg in /public or your Supabase bucket) */
  previewImage?: string;
};

export default function MapFacade({ embedUrl, title, previewImage }: MapFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm dark:bg-neutral-900 sm:h-96">
      {isLoaded ? (
        <iframe
          title={title}
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          aria-label={`Papar peta: ${title}`}
          className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600">
          {previewImage && (
            <Image
              src={previewImage}
              alt=""
              fill
              unoptimized
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />

          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white shadow-lg transition-transform group-hover:scale-110">
            <MapPin className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="relative rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-neutral-800 shadow-sm dark:bg-neutral-950/90 dark:text-neutral-100">
            Klik untuk papar peta
          </span>
        </button>
      )}
    </div>
  );
}
