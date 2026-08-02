import HeroSection from "@/app/(pages)/home/hero-section";
import AboutSection from "./about-us";
import WhyChooseUs from "./why-choose-us";
import FacilitiesSection from "./facilities";
import PricingSection from "./packages";
import LocationSection from "@/components/location";
import BookingCtaSection from "./booking-cta";
import PastClientSection from "./past-client";

async function getHomeData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

const HomePage = async () => {
  await getHomeData();
  return (
    <div className="flex flex-col md:gap-38 gap-16">
      <HeroSection />
      <WhyChooseUs />
      <FacilitiesSection />
      <AboutSection />
      <PricingSection />
      <LocationSection />
      <BookingCtaSection />
      <PastClientSection />
    </div>
  );
};

export default HomePage;
