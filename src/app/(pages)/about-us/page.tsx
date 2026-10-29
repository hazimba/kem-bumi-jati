import { Briefcase, Building2, Map, Plane } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
// import PartnersSection from "../home/Partners";

export const metadata: Metadata = {
  title: "About Us",
  description: "Ketahui lebih lanjut tentang Kem Bumi Jati, legasi, visi dan misi kami.",
  alternates: {
    canonical: "/about-us",
  },
};

const AboutUsPage = async () => {
  const ourServices = [
    {
      title: "Flights & Visa Services",
      description:
        "Competitive domestic and international flight bookings, group itineraries, and complete visa application assistance for a smooth travel experience.",
      icon: <Plane className="text-white w-8 h-8" />,
    },
    {
      title: "Tour & Pilgrimage Packages",
      description:
        "Curated domestic and international tours, including Muslim-friendly destinations, Umrah, Hajj, and Ziarah packages with full arrangements.",
      icon: <Map className="text-white w-8 h-8" />,
    },
    {
      title: "Accommodation & Transport",
      description:
        "Hotel and resort reservations, homestays, and reliable car, van, limousine, and bus rental services for individuals and groups.",
      icon: <Building2 className="text-white w-8 h-8" />,
    },
    {
      title: "Corporate & Event Solutions",
      description:
        "Professional MICE, event management, travel insurance, and tailor-made packages designed for corporate and private needs.",
      icon: <Briefcase className="text-white w-8 h-8" />,
    },

    {
      title: "Flight Tickets",
      description:
        "Competitive pricing for both Domestic and International flights. We handle group bookings and complex itineraries with ease.",
      icon: <Plane className="text-white w-8 h-8" />,
    },
    {
      title: "Holiday Tours",
      description:
        "Expertly curated Domestic and International tour packages. Specialized in Muslim-friendly destinations and Umrah/Hajj programs.",
      icon: <Map className="text-white w-8 h-8" />,
    },
    {
      title: "Reservations",
      description:
        "From luxury Hotels and Resorts to cozy Chalets and Homestays, we secure the best accommodations tailored to your budget.",
      icon: <Building2 className="text-white w-8 h-8" />,
    },
  ];

  return (
    <div className="flex flex-col dark:bg-black bg-white w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
      <section className="grid grid-cols-1 md:grid-cols-3 items-stretch min-h-[500px]">
        <div className="relative h-full min-h-[200px]">
          <Image
            src="https://mishu.my/wp-content/uploads/2026/04/example-of-a-training-centre-in-malaysia-1024x1024.webp"
            alt="Our Journey"
            className="absolute inset-0 object-cover md:w-full md:h-full w-[400px] h-[200px]"
            width={800}
            height={800}
          />
        </div>
        <div className="bg-white dark:bg-gray-900 py-8 md:p-16 col-span-2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-l-4 border-primary pl-4">Our Legacy</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            With <b>decades of experience</b> in the travel industry, we have dedicated ourselves to perfecting the art of both pilgrimage
            and leisure travel. Our journey began with a simple mission: to provide travelers with reliable, thoughtful, and high-quality
            experiences. Over the years, we have evolved from a small local agency into a trusted tour operator, recognized for our
            commitment to excellence and our deep understanding of diverse travel needs. We believe that travel is more than just moving
            from one place to another; it is about the stories we create, the connections we make, and the personal growth we achieve along
            the way.
            <br />
            <br />
            Our team consists of seasoned professionals who are passionate about hospitality. Whether it is navigating the complexities of a
            specialized journey or designing a relaxing family getaway, we handle every detail with precision. We take pride in our
            &quot;customer-first&quot; philosophy, ensuring that from the moment you inquire until the moment you return home, you feel
            supported and valued. As we look to the future, we remain dedicated to innovation, expanding our global network while
            maintaining the traditional values of trust and integrity that have been our cornerstone from the very beginning. We don&apos;t
            just sell packages; we craft memories that last a lifetime, ensuring every traveler finds peace of mind.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 items-stretch min-h-[500px]">
        <div className="bg-gray-50 dark:bg-gray-900 py-8 md:p-16 col-span-2 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-l-4 border-primary pl-4">Our Vision & Mission</h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            <p>
              Our vision is to become a leading global provider of thoughtful, values-driven travel services, setting the benchmark for
              quality and cultural sensitivity. We strive to bridge the gap between modern travel conveniences and traditional values,
              making it easier for every traveler to explore the world without compromise. By leveraging technology and strong global
              partnerships, we aim to offer seamless booking experiences and unparalleled service quality across all seven continents.
            </p>
            <p>
              Our mission is centered on personalized service. We understand that no two travelers are the same, which is why we focus
              heavily on tailor-made programs. From specialized MICE (Meetings, Incentives, Conferences, and Exhibitions) arrangements for
              corporate clients to private transport rentals including limousines and luxury coaches, we ensure every aspect of your trip is
              handled with the utmost care and professionalism.
            </p>
          </div>
        </div>
        <div className="relative h-full min-h-[200px] order-1 md:order-2">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQNBT0-hPzv8_AMMF4OnDYcPZ_rzLgOiNZjiRtieD2hfMc1Trgh0HUnBt&s=10"
            alt="Our Services"
            className="absolute inset-0 object-cover md:w-full md:h-full w-[400px] h-[200px]"
            width={800}
            height={800}
          />
        </div>
      </section>

      <section className="bg-white dark:bg-black md:py-10">
        <div className="flex flex-col max-w-7xl w-full mx-auto px-4 gap-4">
          <h2 id="our-services" className="text-2xl tracking-wide font-medium md:text-4xl text-gray-900 dark:text-white">
            OUR SERVICES
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground dark:text-gray-400 tracking-widest">
            We are proud to collaborate with a diverse range of partners.
          </p>

          <div className="relative">
            <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide py-4">
              {ourServices.map((item, index) => (
                <div
                  key={index}
                  className="snap-center flex-shrink-0 w-[200px] bg-blue-50 dark:bg-gray-800 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-3">
                  <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <PartnersSection home /> */}
    </div>
  );
};

export default AboutUsPage;
