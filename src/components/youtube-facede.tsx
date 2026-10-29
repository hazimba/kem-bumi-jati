"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type YouTubeFacadeProps = {
  videoId: string;
  title: string;
};

export default function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black shadow-sm">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Main video: ${title}`}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600">
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            fill
            unoptimized
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green-700 text-white shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
