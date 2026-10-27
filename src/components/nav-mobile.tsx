"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";

interface NavigationMobileProps {
  isOverlay?: boolean;
}

const NavigationMobile = ({ isOverlay }: NavigationMobileProps) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    startTransition(() => {
      router.push(href);
      setOpen(false);
      setExpanded(null);
    });
  };

  const itemClass = cn(
    "flex w-full items-center justify-between rounded-lg px-6 py-3 text-left text-base font-medium text-foreground transition-colors",
    "hover:bg-muted hover:text-primary",
    isPending && "pointer-events-none opacity-70"
  );

  return (
    <div className="lg:hidden flex items-center gap-4">
      <Sheet
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setExpanded(null);
        }}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            className={cn(
              "bg-transparent hover:bg-transparent",
              isOverlay ? "text-[#F3EDE0] hover:text-[#D4A24C]" : "text-foreground hover:text-muted-foreground"
            )}>
            <Menu className={cn("!h-7 !w-7", isOverlay && "drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]")} />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px] sm:w-[360px]">
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="border-b p-6">
              <SheetTitle className="font-serif text-2xl font-normal">Kem Bumi Jati</SheetTitle>
              <p className="mt-1 text-sm text-muted-foreground">Since 1993 · Nature Camp</p>
            </div>

            <nav className="flex-1 py-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between px-6">
                  <h3 className="text-lg font-medium">Menu</h3>
                  <ModeToggle />
                </div>

                {NAV_LINKS.map((link) => {
                  const isExpanded = expanded === link.href;

                  if (!link.sublinks) {
                    return (
                      <button key={link.href} onClick={() => handleNavigation(link.href)} disabled={isPending} className={itemClass}>
                        {link.label}
                      </button>
                    );
                  }

                  return (
                    <div key={link.href}>
                      <button onClick={() => setExpanded(isExpanded ? null : link.href)} aria-expanded={isExpanded} className={itemClass}>
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Animated collapsible: grid rows go 0fr -> 1fr */}
                      <div
                        aria-hidden={!isExpanded}
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none",
                          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}>
                        <div className="min-h-0 overflow-hidden">
                          <div className="ml-8 mt-1 space-y-1 border-l pl-2">
                            {link.sublinks.map((sublink) => (
                              <button
                                key={sublink.href}
                                onClick={() => handleNavigation(sublink.href)}
                                disabled={isPending}
                                tabIndex={isExpanded ? 0 : -1}
                                className={cn(
                                  "flex w-full items-center rounded-lg px-4 py-2 text-left text-sm text-muted-foreground transition-colors",
                                  "hover:bg-muted hover:text-primary",
                                  isPending && "pointer-events-none opacity-70"
                                )}>
                                {sublink.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </nav>

            <div className="border-t p-6 space-y-4">
              <p className="text-center text-xs text-muted-foreground">Explore • Adventure • Memories</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationMobile;
