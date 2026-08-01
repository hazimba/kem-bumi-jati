"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./location-map").then((mod) => mod.LocationMap), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-neutral-200" />,
});

export default LocationMap;
