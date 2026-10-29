export const NAV_LINKS = [
  { href: "/", label: "Utama" },
  { href: "/latar-belakang", label: "Latar Belakang" },
  {
    href: "/fasiliti",
    label: "Fasiliti",
    sublinks: [
      { href: "/fasiliti", label: "Semua Fasiliti" },
      { href: "/fasiliti/asrama", label: "Asrama" },
      { href: "/fasiliti/dewan-makan", label: "Dewan Makan" },
      { href: "/fasiliti/bilik-urusetia", label: "Bilik Urusetia" },
      { href: "/fasiliti/padang-kawad", label: "Padang Kawad" },
      { href: "/fasiliti/surau", label: "Surau" },
      { href: "/fasiliti/obstacle", label: "Obstacle Course" },
      { href: "/fasiliti/kolam-renang", label: "Kolam Renang" },
      { href: "/fasiliti/dewan-kuliah", label: "Dewan Kuliah" },
    ],
  },
  { href: "/galeri", label: "Galeri" },
  // { href: "/kalendar", label: "Kalendar" },
  { href: "/lokasi-kami", label: "Lokasi" },
  { href: "/hubungi-kami", label: "Hubungi Kami" },
];

export const slides = [
  {
    image:
      "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/hero/1000156967.jpg?width=1200&quality=80",
    tint: "from-black/80 via-black/50 to-black/30",
    eyebrow: "Jalan Kebun, Shah Alam, Selangor",
    heading: "SELAMAT DATANG KE KEM BUMI JATI",
    description: "Pusat Latihan, Kem Motivasi & Aktiviti Berkumpulan.",
    cta: { label: "Lihat Kemudahan", href: "/fasiliti" },
  },
  {
    image:
      "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/hero/1000156981.jpg?width=1200&quality=80",
    tint: "from-black/80 via-black/50 to-black/30",
    eyebrow: "Pusat Latihan Profesional",
    heading: "Pusat Latihan, Kem Motivasi & Aktiviti Berkumpulan",
    description: "Pusat latihan, kem motivasi dan pembangunan insan profesional sejak 1993 di Shah Alam, Selangor.",
    cta: { label: "Lihat Galeri", href: "/galeri" },
  },
  {
    image:
      "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/hero/WhatsApp%20Image%202026-10-23%20at%2021.27.14.jpeg?width=1200&quality=80",
    tint: "from-black/75 via-black/45 to-black/25",
    eyebrow: "",
    heading: "Jalan Kebun, Shah Alam, Selangor",
    description: "Kem Bumi Jati merupakan pusat latihan dan kem motivasi profesional sejak 1993 di Shah Alam, Selangor.",
    cta: { label: "Hubungi Kami", href: "/hubungi-kami" },
  },
];
