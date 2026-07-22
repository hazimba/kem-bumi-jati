import { ShieldCheck, Globe, BadgeCheck, Headset, Zap, Moon } from "lucide-react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const WhyChooseUs = () => {
  const ReasonWhyChooseUs = [
    {
      title: "Jurulatih Berpengalaman",
      description: "Dibimbing oleh tenaga pengajar yang berpengalaman dalam bidang masing-masing.",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      mobile: true,
    },
    {
      title: "Sijil Diiktiraf",
      description: "Program latihan yang memberikan sijil bernilai dan diiktiraf.",
      icon: <BadgeCheck className="w-5 h-5 text-primary" />,
      mobile: true,
    },
    {
      title: "Pembelajaran Praktikal",
      description: "Fokus kepada latihan hands-on untuk meningkatkan kemahiran sebenar.",
      icon: <Globe className="w-5 h-5 text-primary" />,
      mobile: true,
    },
    {
      title: "Sokongan Sepanjang Kursus",
      description: "Bimbingan dan bantuan diberikan dari awal hingga tamat latihan.",
      icon: <Headset className="w-5 h-5 text-primary" />,
      mobile: true,
    },
    {
      title: "Jadual Fleksibel",
      description: "Pilihan kelas yang fleksibel mengikut kesesuaian masa peserta.",
      icon: <Zap className="w-5 h-5 text-primary" />,
      mobile: false,
    },
    {
      title: "Latihan Berkualiti",
      description: "Modul pembelajaran terkini yang memenuhi keperluan industri.",
      icon: <Moon className="w-5 h-5 text-primary hover:text-white" />,
      mobile: false,
    },
  ];

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium">Bersama Kami</p>

          <h2 className={`${fraunces.className} mt-2 text-3xl md:text-4xl font-semibold italic text-foreground`}>
            Langkah Anda Bermula Di Sini
          </h2>

          <p className="mx-auto mt-4 max-w-7xl text-sm md:text-base text-muted-foreground">
            Kami percaya setiap peserta mempunyai potensi untuk berkembang melalui latihan yang berkualiti, bimbingan profesional, dan
            pengalaman pembelajaran yang bermakna.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {ReasonWhyChooseUs.map((item, idx) => (
            <div
              key={idx}
              className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border border-transparent ${
                item.mobile ? "" : "hidden md:flex"
              }`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300">
                <div className="">{item.icon}</div>
              </div>
              <div>
                <h1 className="font-semibold transition-colors italic md:not-italic">{item.title}</h1>
                <h2 className="text-xs md:text-sm text-muted-foreground leading-snug mt-1">{item.description}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-6">
          <p className="text-xs md:text-sm text-slate-500 italic">
            Komitmen kami adalah memberikan pengalaman training yang{" "}
            <span className="text-primary font-medium">selamat, bermakna, dan sukar dilupakan.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
