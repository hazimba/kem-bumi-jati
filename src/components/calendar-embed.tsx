"use client";

import { useState } from "react";

const embedUrl = "https://calendar.google.com/calendar/embed?src=hazimbaa%40gmail.com&ctz=Asia%2FKuala_Lumpur";
// const embedUrl = "https://calendar.google.com/calendar/embed?src=kbjcalendar%40gmail.com&ctz=Asia%2FKuala_Lumpur";

export default function CalendarEmbed() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="w-full">
      {showCalendar ? (
        <iframe
          src={embedUrl}
          title="Kem Bumi Jati Schedule"
          width="100%"
          height="600"
          style={{ border: 0 }}
          loading="lazy"
          className="w-full rounded-lg"
        />
      ) : (
        <div className="flex min-h-[350px] flex-col items-center justify-center gap-4 rounded-lg border bg-muted/30 p-6 text-center">
          <h3 className="text-xl font-semibold">Kem Bumi Jati Schedule</h3>

          <p className="max-w-md text-sm text-muted-foreground">View our upcoming events and schedule directly from Google Calendar.</p>

          <button
            type="button"
            onClick={() => setShowCalendar(true)}
            className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
            View calendar
          </button>
        </div>
      )}
    </div>
  );
}
