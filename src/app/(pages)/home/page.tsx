import HeroSection from "@/app/(pages)/home/hero-section";
import AboutSection from "./about-us";
import WhyChooseUs from "./why-choose-us";

const HomePage = () => {
  return (
    <div className="flex flex-col md:gap-38 gap-16">
      <HeroSection />
      <WhyChooseUs />
      <AboutSection />
      {/* <h1>Welcome to the Home Page</h1> */}
    </div>
  );
};

export default HomePage;
