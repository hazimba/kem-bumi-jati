"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VID_KEY = "visitor_id";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    async function trackVisit() {
      try {
        // Get or create a permanent ID for this browser
        let visitorId = localStorage.getItem(VID_KEY);

        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem(VID_KEY, visitorId);
        }

        const res = await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: pathname,
            visitorId,
          }),
        });

        if (cancelled) return;

        if (!res.ok) {
          console.error("Failed to track visit:", res.status, await res.text());
          return;
        }

        await res.json();
      } catch (error) {
        if (!cancelled) {
          console.error("Analytics tracking error:", error);
        }
      }
    }

    trackVisit();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
