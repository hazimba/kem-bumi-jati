import Footer from "@/components/footer";
import { NavRender } from "@/components/nav-render";
import PageLoader from "@/components/page-loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import WhatsAppButton from "@/components/whatsapp-button";
import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { AnalyticsTracker } from "@/components/analytic-tracker";
import Script from "next/script";
import GoogleAnalytics from "@/components/google-analytics";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kembumijati.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kem Bumi Jati | Kem Motivasi, Team Building & Outdoor Camp",
    template: "%s | Kem Bumi Jati",
  },
  description:
    "Kem Bumi Jati menyediakan kemudahan lengkap untuk kem akademik, kem motivasi, latihan organisasi, team building, dan penginapan asrama di Selangor sejak 1973.",
  keywords: [
    "Kem Bumi Jati",
    "Kem motivasi Selangor",
    "Kem akademik",
    "Tempat team building Selangor",
    "Outdoor camp Malaysia",
    "Kem penginapan asrama",
    "Lokasi kem motivasi",
    "Kem latihan organisasi",
  ],
  authors: [{ name: "Kem Bumi Jati" }],
  creator: "Kem Bumi Jati",
  publisher: "Kem Bumi Jati",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google-site-verification=vN2yZEqIUo8nkNaC1IM9S9IuhfPqNr0eJCfwRkAY2hk",
  },
  openGraph: {
    type: "website",
    locale: "ms_MY",
    url: siteUrl,
    siteName: "Kem Bumi Jati",
    title: "Kem Bumi Jati | Kem Motivasi, Team Building & Outdoor Camp",
    description: "Pusat kem latihan, motivasi, dan team building lengkap di Selangor sejak 1973.",
    images: [
      {
        url: "https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000211396.jpg",
        width: 1200,
        height: 630,
        alt: "Kawasan Kem Bumi Jati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kem Bumi Jati | Outdoor Camp & Retreat",
    description: "Pusat kem latihan, motivasi, dan team building lengkap di Selangor sejak 1973.",
    images: ["https://mlapxffieyehdpvuzsyw.supabase.co/storage/v1/object/public/kem_bumi_jati_header_background_img/1000211396.jpg"],
  },
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon.ico",
    apple: "/assets/favicon.ico",
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
    <html lang="en" className={` ${robotoMono.variable}  h-full antialiased`} suppressHydrationWarning>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-YM0M9XWBJH" strategy="afterInteractive" />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            window.gtag('js', new Date());
            window.gtag('config', 'G-YM0M9XWBJH');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavRender />
          <Suspense fallback={null}>
            <PageLoader />
          </Suspense>
          <div className="flex-1">
            <GoogleAnalytics />
            {children}
          </div>
          <AnalyticsTracker />
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
