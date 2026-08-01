"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/(pages)/home/loading";

export default function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isLoading) return null;

  return <Loading />;
}
