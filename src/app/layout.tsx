import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { NavRender } from "@/components/nav-render";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kembumijati.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kem Bumi Jati | Outdoor Camp & Retreat Since 1973",
    template: "%s | Kem Bumi Jati",
  },
  description:
    "Kem Bumi Jati is an outdoor camp and retreat centre established in 1973, offering school camps, scouting programmes, team-building activities, and nature retreats set on jungle grounds.",
  keywords: [
    "Kem Bumi Jati",
    "outdoor camp Malaysia",
    "school camp",
    "scouting camp",
    "team building retreat",
    "jungle camp",
    "nature retreat Malaysia",
  ],
  authors: [{ name: "Kem Bumi Jati" }],
  creator: "Kem Bumi Jati",
  publisher: "Kem Bumi Jati",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: siteUrl,
    siteName: "Kem Bumi Jati",
    title: "Kem Bumi Jati | Outdoor Camp & Retreat Since 1973",
    description: "Outdoor camp and retreat centre since 1973 — school camps, scouting programmes, and nature retreats.",
    images: [
      {
        url: "/assets/",
        width: 1200,
        height: 630,
        alt: "Kem Bumi Jati camp grounds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kem Bumi Jati | Outdoor Camp & Retreat Since 1973",
    description: "Outdoor camp and retreat centre since 1973 — school camps, scouting programmes, and nature retreats.",
    images: ["/assets/og-image.webp"],
  },
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon-16x16.png",
    apple: "/assets/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#16261C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable}  h-full antialiased`}
      suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavRender />
          <>{children}</>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
