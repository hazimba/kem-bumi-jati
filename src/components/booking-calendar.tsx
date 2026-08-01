"use client";

import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import type { DateRange } from "react-day-picker";

// Example: dates already booked out / unavailable — replace with real data from your backend
const UNAVAILABLE_DATES = [new Date(2026, 7, 8), new Date(2026, 7, 9), new Date(2026, 7, 15), new Date(2026, 7, 22), new Date(2026, 7, 23)];

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function getDatesBetween(from: Date, to: Date) {
  const dates: Date[] = [];
  const cursor = new Date(from);
  while (cursor <= to) {
    dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export function BookingCalendar() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const isUnavailable = (day: Date) => UNAVAILABLE_DATES.some((d) => isSameDay(d, day));

  const rangeIncludesUnavailable = useMemo(() => {
    if (!range?.from || !range?.to) return false;
    const days = getDatesBetween(range.from, range.to);
    return days.some((d) => isUnavailable(d));
  }, [range]);

  const formatDate = (d: Date) => d.toLocaleDateString("ms-MY", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="flex flex-col items-center w-screen gap-4">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0)) || isUnavailable(day)}
        modifiers={{ unavailable: UNAVAILABLE_DATES }}
        modifiersClassNames={{
          unavailable:
            "line-through text-red-500 dark:text-red-400 opacity-80 [&:not([data-selected])]:bg-red-50 dark:[&:not([data-selected])]:bg-red-950/30",
        }}
        className="rounded-xl border border-border w-[90%] bg-card w-3/4 p-3 shadow-sm"
      />

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand" />
          Tersedia
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400 dark:bg-red-500" />
          Ditempah
        </div>
      </div>

      {/* Reserved-height wrapper so appearing text doesn't shift layout */}
      <div className="flex min-h-13 w-full max-w-base items-center justify-center">
        {rangeIncludesUnavailable ? (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/50 dark:bg-brand dark:text-red-400 transition-all duration-300">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span className="text-[8px]">
              Terdapat tarikh tidak tersedia dalam julat ini. <br /> Hubungi PIC kami untuk maklumat lanjut.
            </span>
          </div>
        ) : (
          <p
            className={cn(
              "text-center text-sm text-brand-dark dark:text-brand-light transition-all duration-300",
              range?.from ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
            )}>
            {range?.from && !range?.to && (
              <>
                Tarikh mula: <span className="font-semibold">{formatDate(range.from)}</span>
              </>
            )}
            {range?.from && range?.to && (
              <>
                <span className="font-semibold">{formatDate(range.from)}</span> —{" "}
                <span className="font-semibold">{formatDate(range.to)}</span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
