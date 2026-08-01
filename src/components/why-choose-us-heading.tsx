"use client";

import { useRef, useState, useEffect } from "react";
import { ScrambleText, type ScrambleTextHandle } from "./scramble-text";

export function WhyChooseHeading() {
  const scrambleRef = useRef<ScrambleTextHandle>(null);
  const sectionRef = useRef<HTMLHeadingElement>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    // only run this scroll-trigger behavior on mobile widths
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRunRef.current) {
            hasRunRef.current = true;
            scrambleRef.current?.scramble();
            observer.disconnect(); // only ever fire once
          }
        });
      },
      {
        threshold: 0.6, // fires once heading is 60% visible
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <h2 ref={sectionRef} className="font-fraunces mt-2 text-3xl md:text-4xl font-semibold italic text-foreground">
      Langkah Anda <ScrambleText ref={scrambleRef} as="span" text="Bermula" className="text-primary underline" /> Di Sini
    </h2>
  );
}
