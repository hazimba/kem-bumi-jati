import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

interface NavigationMobileProps {
  isOverlay?: boolean;
}

const NavigationMobile = ({ isOverlay }: NavigationMobileProps) => {
  return (
    <>
      <div className="md:hidden flex items-center gap-4">
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              className={cn(isOverlay && "text-[#F3EDE0] hover:bg-white/10 hover:text-[#F3EDE0]")}
            >
              <Menu className="!h-7 !w-7" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[360px]">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="border-b p-6">
                <h2 className="font-serif text-2xl">Kem Bumi Jati</h2>
                <p className="mt-1 text-sm text-muted-foreground">Since 1972 · Nature Camp</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 py-8">
                <div className="space-y-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center rounded-lg px-6 py-3 text-base font-medium transition-colors hover:bg-muted hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Footer */}
              <div className="border-t p-6 space-y-4">
                <Button className="w-full bg-[#D4A24C] text-[#16261C] hover:bg-[#D4A24C]/90">Contact Us</Button>

                <p className="text-center text-xs text-muted-foreground">Explore • Adventure • Memories</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
export default NavigationMobile;
