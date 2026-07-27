// components/WhyChooseUsCard.tsx
"use client";

import { useRef } from "react";
import { ScrambleText, type ScrambleTextHandle } from "./scramble-text";

interface WhyChooseUsCardProps {
  item: { title: string; description: string; icon: React.ReactNode; mobile: boolean };
  delay: number;
}

export function WhyChooseUsCard({ item, delay }: WhyChooseUsCardProps) {
  const scrambleRef = useRef<ScrambleTextHandle>(null);

  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => scrambleRef.current?.scramble()}
      onMouseLeave={() => scrambleRef.current?.reset()}
      className={`reveal-card group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-primary/20 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1.5 ${
        item.mobile ? "" : "hidden md:flex"
      }`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6">
        <div>{item.icon}</div>
      </div>
      <div>
        <ScrambleText ref={scrambleRef} as="h1" text={item.title} className="font-semibold italic md:not-italic" />
        <h2 className="text-xs md:text-sm text-muted-foreground leading-snug mt-1">{item.description}</h2>
      </div>
    </div>
  );
}
