import HeroSection from "@/app/(pages)/utama/hero-section";
import AboutSection from "./about-us";
import WhyChooseUs from "./why-choose-us";
import FacilitiesSection from "./facilities";
import PricingSection from "./packages";
import LocationSection from "@/components/location";
import BookingCtaSection from "./booking-cta";
import PastClientSection from "./past-client";
import WhyUs from "./why-us";
import LocationBanner from "./location-banner";
import { Metadata } from "next";

async function getHomeData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

export const metadata: Metadata = {
  title: "Utama",
  description: "Kemudahan lengkap untuk memastikan program anda berjalan dengan lancar dan selesa.",
  alternates: {
    canonical: "/",
  },
};

const HomePage = async () => {
  await getHomeData();
  return (
    <div className="flex flex-col md:gap-38 gap-16">
      <HeroSection />
      <WhyUs />
      <LocationBanner />
      {/* <WhyChooseUs /> */}
      {/* <FacilitiesSection /> */}
      {/* <AboutSection /> */}
      {/* <PricingSection /> */}
      {/* <LocationSection /> */}
      {/* <BookingCtaSection /> */}
      {/* <PastClientSection /> */}
    </div>
  );
};

export default HomePage;
