"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "./navigation-bar";

export function NavRender() {
  const pathname = usePathname();

  if (pathname === "/home") {
    return null;
  } else {
    return <NavigationBar variant="solid" />;
  }
}
