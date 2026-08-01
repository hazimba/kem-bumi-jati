"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingCalendar } from "./booking-calendar";

export function BookingCalendarPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile: collapsible trigger row */}
      <Collapsible open={open} onOpenChange={setOpen} className="md:hidden">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-brand-dark/10 bg-white px-4 py-3 text-sm font-medium text-brand-dark transition-colors hover:bg-brand-dark/5">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-brand" />
            Lihat Tarikh Tersedia
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} />
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="flex justify-center pt-4">
            <BookingCalendar />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Desktop: always visible, no collapsible wrapper */}
      <div className="hidden md:flex md:justify-center">
        <BookingCalendar />
      </div>
    </div>
  );
}
