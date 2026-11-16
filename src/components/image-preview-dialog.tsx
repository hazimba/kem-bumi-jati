"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageItem {
  id: string;
  url: string;
}

interface ImagePreviewDialogProps {
  images: ImageItem[];
  initialIndex?: number;
  title: string;
  trigger: React.ReactNode;
}

export default function ImagePreviewDialog({ images, initialIndex = 0, title, trigger }: ImagePreviewDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [open, setOpen] = useState(false);

  // Sync index when dialog opens or initialIndex changes
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images?.length || !trigger) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-[95vw] gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-2xl sm:max-w-[92vw] lg:max-w-6xl [&>button]:hidden">
        <div className="flex max-h-[92vh] flex-col">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3.5">
            <DialogTitle className="truncate text-base font-semibold text-slate-900 sm:text-lg">{title}</DialogTitle>
            <div className="flex shrink-0 items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium tabular-nums text-slate-600">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main image */}
          <div className="relative h-[55vh] w-full bg-slate-50 sm:h-[65vh] lg:h-[72vh]">
            <Image
              src={images[currentIndex].url}
              alt={`${title} - ${currentIndex + 1}`}
              fill
              unoptimized
              className="object-contain p-2 sm:p-4"
              sizes="95vw"
              priority
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-3 top-1/2 z-30 h-11 w-11 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur-sm hover:bg-white hover:text-slate-900 sm:left-5 sm:h-12 sm:w-12"
                  onClick={handlePrevious}>
                  <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 z-30 h-11 w-11 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur-sm hover:bg-white hover:text-slate-900 sm:right-5 sm:h-12 sm:w-12"
                  onClick={handleNext}>
                  <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnails (Only show if multiple images) */}
          {images.length > 1 && (
            <div className="overflow-x-auto border-t border-slate-200 bg-white px-4 py-3">
              <div className="flex justify-center gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                      currentIndex === idx ? "ring-emerald-500 opacity-100" : "ring-transparent opacity-60 hover:opacity-100"
                    }`}>
                    <Image src={img.url} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
