"use client";

import { useState } from "react";

interface ExpandableTextProps {
  text: string;
  maxWords?: number;
  className?: string;
}

export default function ExpandableText({ text, maxWords = 50, className = "" }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const words = text.trim().split(/\s+/);
  const shouldTruncate = words.length > maxWords;

  const truncatedText = words.slice(0, maxWords).join(" ");

  return (
    <>
      <p className={`${className} sm:hidden`}>
        {shouldTruncate && !expanded ? (
          <button type="button" onClick={() => setExpanded(true)} className="text-left">
            {truncatedText}... <p className="font-semibold text-green-700 hover:underline dark:text-green-400">See more</p>
          </button>
        ) : (
          <button type="button" onClick={() => setExpanded(false)} className="text-left">
            {text}
            {shouldTruncate && (
              <>
                {" "}
                <p className="font-semibold text-green-700 hover:underline dark:text-green-400">See less</p>
              </>
            )}
          </button>
        )}
      </p>

      {/* Desktop */}
      <p className={`${className} hidden sm:block`}>{text}</p>
    </>
  );
}
