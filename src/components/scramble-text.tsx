// components/ScrambleText.tsx
"use client";

import { useState, useRef, useCallback, forwardRef, useImperativeHandle } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export interface ScrambleTextHandle {
  scramble: () => void;
  reset: () => void;
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "span" | "p";
}

export const ScrambleText = forwardRef<ScrambleTextHandle, ScrambleTextProps>(({ text, className, as: Tag = "span" }, ref) => {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalIterations = text.length * 2;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplay((prev) =>
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration / 2) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration > totalIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, 30);
  }, [text]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplay(text);
  }, [text]);

  useImperativeHandle(ref, () => ({ scramble, reset }), [scramble, reset]);

  return <Tag className={className}>{display}</Tag>;
});

ScrambleText.displayName = "ScrambleText";
