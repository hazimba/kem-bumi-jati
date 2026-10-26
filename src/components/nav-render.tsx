"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "./navigation-bar";
import AdminNavBar from "./admin-nav-bar";

export function NavRender() {
  const pathname = usePathname();

  // Hide nav on home page
  if (pathname === "/home") {
    return null;
  }
  
  // Use admin nav for admin routes
  if (pathname.startsWith("/admin")) {
    return <AdminNavBar />;
  }

  // Default public nav
  return <NavigationBar variant="solid" />;
}