"use client";

import { ReactNode, useState, useEffect, useRef, Suspense } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./page-loader";

interface ClientPageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ClientPageWrapper({ children, className = "" }: ClientPageWrapperProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const isFirstRender = useRef(true);
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isFirstRender.current && prevPathnameRef.current !== pathname) {
      // Animate out current content
      setIsVisible(false);

      // After brief delay, show new content
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1);

      return () => clearTimeout(timer);
    }

    isFirstRender.current = false;
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <Suspense fallback={null}>
      <div
        className={`w-full ${className}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 150ms ease-in-out",
          transform: isVisible ? "translateY(0)" : "translateY(-10px)",
          transitionTimingFunction: "ease-in-out",
        }}>
        <PageLoader />
        {children}
      </div>
    </Suspense>
  );
}

export default ClientPageWrapper;
