"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, CheckCircle2, Users, ChevronDown } from "lucide-react";

export function GoogleCalendarSync() {
  const [isOpen, setIsOpen] = useState(false);
  // Mount the iframe only after the first open, then keep it so the close animation can play
  const [hasOpened, setHasOpened] = useState(false);

  const embedUrl = "https://calendar.google.com/calendar/embed?src=kbjcalendar%40gmail.com&ctz=Asia%2FKuala_Lumpur";

  const handleToggle = () => {
    if (!isOpen) setHasOpened(true);
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="mx-auto mt-8 max-w-7xl overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      {/* Header = toggle button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="kem-bumi-jati-calendar"
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600 dark:hover:bg-neutral-800/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-700 text-white dark:bg-green-600">
            <CalendarIcon className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Semak Ketersediaan</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {isOpen
                ? "Tutup kalendar tempahan"
                : "Buka untuk melihat tarikh yang tersedia · Disegerakkan daripada Google Calendar Kem Bumi Jati"}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Smooth accordion: animates grid row height 0fr <-> 1fr */}
      <div
        id="kem-bumi-jati-calendar"
        role="region"
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}>
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-neutral-200 p-5 dark:border-neutral-800">
            {/* Inline legend */}
            <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600" />
                Kemaskini Langsung
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                Tarikh kosong boleh ditempah
              </span>

              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 shrink-0 text-amber-600" />
                Tarikh bertanda telah ditempah
              </span>
            </div>

            {/* Fixed-height frame so the iframe loading doesn't make the animation jump */}
            <div className="h-[350px] w-full overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800">
              {hasOpened && (
                <iframe
                  src={embedUrl}
                  title="Google Calendar Kem Bumi Jati"
                  tabIndex={isOpen ? 0 : -1}
                  style={{ border: 0 }}
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
