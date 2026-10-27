import { ModeToggle } from "@/components/mode-toggle";
import { NAV_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavigationDesktopProps {
  isOverlay?: boolean;
}

const NavigationDesktop = ({ isOverlay }: NavigationDesktopProps) => {
  // Shared by BOTH plain links and dropdown triggers so they look identical
  const navItemClass = cn(
    "inline-flex h-auto items-center px-3 py-2 text-sm font-medium transition-colors",
    "bg-transparent hover:bg-transparent focus:bg-transparent",
    "data-[state=open]:bg-transparent data-[active]:bg-transparent",
    isOverlay
      ? "text-[#F3EDE0] hover:text-[#D4A24C] focus:text-[#D4A24C] data-[state=open]:text-[#D4A24C] "
      : "text-foreground hover:text-muted-foreground focus:text-muted-foreground data-[state=open]:text-muted-foreground"
  );

  return (
    <div className="hidden lg:flex items-center gap-12">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">
          {NAV_LINKS.map((link) => (
            <NavigationMenuItem key={link.href}>
              {link.sublinks ? (
                <>
                  <NavigationMenuTrigger className={navItemClass}>{link.label}</NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-1 rounded-md bg-background p-2 shadow-lg">
                      {link.sublinks.map((sublink) => (
                        <li key={sublink.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={sublink.href}
                              prefetch={false}
                              className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                              {sublink.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link href={link.href} prefetch={false} className={navItemClass}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavigationDesktop;
