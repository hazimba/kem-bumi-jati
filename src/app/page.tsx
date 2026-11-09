import HeroSection from "@/app/(pages)/utama/hero-section";
import WhyUs from "@/app/(pages)/utama/why-us";
import LocationBanner from "@/app/(pages)/utama/location-banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kem Bumi Jati | Kem Motivasi, Team Building & Outdoor Camp",
  description: "Kemudahan lengkap untuk memastikan program anda berjalan dengan lancar dan selesa.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 md:gap-38">
      <HeroSection />
      <WhyUs />
      <LocationBanner />
    </div>
  );
}
