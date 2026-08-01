import { cn } from "@/lib/utils";
import Image from "next/image";
import NavigationDesktop from "./nav-desktop";
import NavigationMobile from "./nav-mobile";

interface NavigationBarProps {
  variant?: "solid" | "overlay";
}

const NavigationBar = ({ variant = "solid" }: NavigationBarProps) => {
  const isOverlay = variant === "overlay";

  return (
    <nav className={cn("relative", isOverlay ? "bg-transparent border-b border-white/15" : "border-b bg-background")}>
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Image src="/assets/kbj-icon.jpeg" alt="Kem Bumi Jati Logo" width={50} height={50} className="" />
          <div>
            <h1 className={cn("text-lg md:text-xl font-serif", isOverlay && "text-secondary")}>Kem Bumi Jati</h1>
            <p className={cn("text-md", isOverlay ? "text-brand-dark" : "text-brand-dark")}>Since 1993</p>
          </div>
        </div>
        <NavigationDesktop isOverlay={isOverlay} />
        <NavigationMobile isOverlay={isOverlay} />
      </div>
    </nav>
  );
};

export default NavigationBar;
