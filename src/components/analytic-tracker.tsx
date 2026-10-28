"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VID_KEY = "visitor_id";
const LAST_KEY = "last_visit_logged_at";
const VISIT_WINDOW_MS = 5 * 60 * 60 * 1000; // 5 hours, same as the server

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip admin/login pages (check inside the effect, not before it)
    if (pathname === "/admin" || pathname === "/login") return;

    try {
      // Permanent ID for this browser
      let visitorId = localStorage.getItem(VID_KEY);
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem(VID_KEY, visitorId);
      }

      // Already logged within the last 5 hours? Skip.
      const last = Number(localStorage.getItem(LAST_KEY) || 0);
      const now = Date.now();
      if (now - last < VISIT_WINDOW_MS) return;

      // Mark first, so a fast second render or second tab doesn't send again
      localStorage.setItem(LAST_KEY, String(now));

      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pathname, visitorId }),
        keepalive: true,
      })
        .then((res) => {
          if (!res.ok) {
            // Allow a retry on the next page load if the request failed
            localStorage.removeItem(LAST_KEY);
            console.error("Failed to track visit:", res.status);
          }
        })
        .catch((err) => {
          localStorage.removeItem(LAST_KEY);
          console.error("Analytics tracking error:", err);
        });
    } catch {
      // localStorage blocked: skip tracking
    }
  }, [pathname]);

  return null;
}
