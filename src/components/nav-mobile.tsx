"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

interface NavigationMobileProps {
  isOverlay?: boolean;
}

const NavigationMobile = ({ isOverlay }: NavigationMobileProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    // Start Next.js navigation inside React's transition boundary
    startTransition(() => {
      router.push(href);
      // Close the sheet after navigation completes
      setOpen(false);
    });
  };

  return (
    <div className="md:hidden flex items-center gap-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            className={cn(isOverlay && "text-[#F3EDE0] hover:bg-white/10 hover:text-[#F3EDE0]")}>
            <Menu className="!h-7 !w-7 !text-brand-dark" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px] sm:w-[360px]">
          <div className="flex h-full flex-col">
            <div className="border-b p-6">
              <h2 className="font-serif text-2xl">Kem Bumi Jati</h2>
              <p className="mt-1 text-sm text-muted-foreground">Since 1993 · Nature Camp</p>
            </div>

            <nav className="flex-1 py-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between px-6">
                  <h3 className="text-lg font-medium">Menu</h3>
                  <ModeToggle />
                </div>
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href)}
                    disabled={isPending}
                    className={cn(
                      "flex w-full items-center rounded-lg px-6 py-3 text-left text-base font-medium transition-colors hover:bg-muted hover:text-primary",
                      isPending && "opacity-70 pointer-events-none"
                    )}>
                    {link.label}
                  </button>
                ))}
              </div>
            </nav>

            <div className="border-t p-6 space-y-4">
              <Button
                onClick={() => handleNavigation("/contact")}
                disabled={isPending}
                className="w-full bg-[#D4A24C] text-[#16261C] hover:bg-[#D4A24C]/90">
                Contact Us
              </Button>

              <p className="text-center text-xs text-muted-foreground">Explore • Adventure • Memories</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationMobile;
