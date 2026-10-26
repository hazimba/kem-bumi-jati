"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ImagePreviewDialogProps {
  src: string;
  alt: string;
  title: string;
  buttonText?: string;
  className?: string;
}

export default function ImagePreviewDialog({
  src,
  alt,
  title,
  buttonText = "Lihat Dalam Saiz Penuh",
  className = "",
}: ImagePreviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={buttonText}
          className={`relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm cursor-zoom-in ${className}`}>
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-5xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="relative aspect-[4/3] max-h-[75vh] w-full">
          <Image src={src} alt={alt} fill unoptimized className="object-contain" sizes="95vw" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
