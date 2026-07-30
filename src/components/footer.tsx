import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/kbj-icon.jpeg"
                alt="TM Tour Travel Logo"
                width={10}
                height={10}
                loading="eager"
                className="object-contain w-auto h-14 pr-4"
              />
              <div>
                <h2 className="font-bold text-lg leading-tight">Kem Bumi Jati.</h2>
                <p className="text-xs font-mono">SEJAK 1993</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-justify">
              ZH Warisan Holdings Sdn. Bhd. <br /> <br /> Pusat latihan, kem motivasi dan pembangunan insan profesional di Shah Alam,
              Selangor
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                prefetch={false}
                href="https://www.facebook.com/TMToursTravel"
                target="_blank"
                key={"facebook"}
                rel="noopener noreferrer">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 1 }}>
                  <path fill="none" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                prefetch={false}
                href="https://www.instagram.com/TMToursTravel"
                target="_blank"
                key={"instagram"}
                rel="noopener noreferrer">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 1 }}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
                </svg>
              </Link>
              <Link prefetch={false} key="whatsapp" href="https://wa.me/60176037054" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">WhatsApp</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 1 }}>
                  <path
                    fill="none"
                    d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold text-white border-b border-gray-700 pb-2">PAUTAN PANTAS</h3>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-200">Tenting Kami</p>
                <p>Kemudahan</p>
                <p>Aktiviti</p>
                <p>Pakej</p>
                <p>Galeri</p>
                <p className="pt-2 italic">Hubungi Kami</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white border-b border-gray-700 pb-2">HUBUNGI</h3>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-200">+0351616692/ 0162294114</p>
                <p>Lot 3319, Jalan Kem Bumi Jati</p>
                <p>Batu 7, Jalan Kebun, Seksyen 30</p>
                <p>40460 Shah Alam</p>
                <p>Selangor, MALAYSIA</p>
                <p className="pt-2 italic">bumijati4114@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          © {new Date().getFullYear()} Kem Bumi Jati - ZH Warisan Holdings
        </div>
      </div>
    </footer>
  );
};

export default Footer;
