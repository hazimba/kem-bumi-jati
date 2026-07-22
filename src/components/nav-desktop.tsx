import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavigationDesktopProps {
  isOverlay?: boolean;
}

const NavigationDesktop = ({ isOverlay }: NavigationDesktopProps) => {
  const linkClass = cn(
    "transition-colors",
    isOverlay ? "text-[#F3EDE0] hover:text-[#D4A24C] text-[#16261C]" : "text-foreground hover:text-muted-foreground"
  );
  return (
    <>
      <div className="hidden md:flex items-center gap-12">
        <div className="flex items-center gap-6 text-sm text-[#16261C]">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button className={cn(isOverlay && "bg-[#D4A24C] text-[#16261C] hover:bg-[#D4A24C]/90")}>Contact Us</Button>

          <ModeToggle />
        </div>
      </div>
    </>
  );
};
export default NavigationDesktop;
