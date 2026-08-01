"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons breaking with Next.js bundler
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Auto-recalculate map dimensions on mobile screen orientation changes or mount
function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  return null;
}

const LAT = 2.9633331;
const LNG = 101.5399247;

export function LocationMap() {
  return (
    <MapContainer
      center={[LAT, LNG]}
      zoom={15}
      scrollWheelZoom={false}
      dragging={!L.Browser.mobile} // Enables smooth 1-finger scrolling past the map on mobile
      tap={false}
      className="h-full w-full z-0"
      style={{ background: "#f5f5f0" }}>
      <MapResizeHandler />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[LAT, LNG]}>
        <Popup className="font-sans text-xs">
          <span className="font-semibold text-neutral-800">Kem Bumi Jati</span>
          <br />
          Shah Alam, Selangor
        </Popup>
      </Marker>
    </MapContainer>
  );
}
