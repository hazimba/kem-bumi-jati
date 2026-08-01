import HeroSection from "@/app/(pages)/home/hero-section";
import AboutSection from "./about-us";
import WhyChooseUs from "./why-choose-us";
import FacilitiesSection from "./facilities";
import PricingSection from "./packages";

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
      {/* <h1>Welcome to the Home Page</h1> */}
    </div>
  );
};

export default HomePage;
