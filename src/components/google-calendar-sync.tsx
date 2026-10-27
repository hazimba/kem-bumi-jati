"use client";

import { Calendar as CalendarIcon, CheckCircle2, Clock, Users } from "lucide-react";

export function GoogleCalendarSync() {
  const embedUrl = "https://calendar.google.com/calendar/embed?src=hazimbaa%40gmail.com&ctz=Asia%2FKuala_Lumpur";

  return (
    <div className="mx-auto mt-8 max-w-7xl rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 text-white dark:bg-green-600">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Jadual Tempahan & Kalendar</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Disegerakkan secara terus daripada Google Calendar Kem Bumi Jati
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Left side panel */}
        <aside className="flex w-full shrink-0 flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 md:w-64">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600" />
              Kemaskini Langsung
            </span>
            <h4 className="mt-3 text-base font-bold text-neutral-800 dark:text-neutral-100">Semak Ketersediaan</h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Lihat tarikh yang masih kosong sebelum membuat tempahan kem anda.
            </p>
          </div>

          <ul className="space-y-3 border-t border-neutral-200 pt-4 text-xs dark:border-neutral-800">
            <li className="flex items-start gap-2.5 text-neutral-700 dark:text-neutral-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>Tarikh kosong boleh ditempah</span>
            </li>
            <li className="flex items-start gap-2.5 text-neutral-700 dark:text-neutral-300">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span>Tarikh bertanda telah ditempah</span>
            </li>
            <li className="flex items-start gap-2.5 text-neutral-700 dark:text-neutral-300">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              <span>Waktu Malaysia (GMT+8)</span>
            </li>
          </ul>
        </aside>

        {/* Calendar */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <div className="relative !h-[350px] w-full">
            <iframe
              src={embedUrl}
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              title="Google Calendar Kem Bumi Jati"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-600"></span>
          Papar jadual penuh & ketersediaan bilik/kem
        </span>
        {/* <span>Kemaskini automatik dari Google Calendar</span> */}
      </div>
    </div>
  );
}
