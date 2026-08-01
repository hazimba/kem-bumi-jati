"use client";

import { Target } from "lucide-react";

export default function Loading() {
  return (
    <div id="preloader" className="fixed inset-0 z-[9999] flex items-center bg-white justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Animated Target / Focus Icon */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full" />
          <Target className="h-10 w-10 animate-pulse text-[#D4A24C]" />
        </div>

        {/* Loading Text */}
        <div className="flex items-center text-sm font-semibold tracking-widest text-[#16261C] sm:text-base">
          <span className="uppercase">Your Next Training Center</span>
          <span className="ml-1 inline-flex">
            <span className="animate-bounce [animation-delay:0ms]">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
