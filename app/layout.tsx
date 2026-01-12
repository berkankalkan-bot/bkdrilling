import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "BK Drilling - Sondaj ve Matkap Yedek Parçaları",
    template: "%s | BK Drilling",
  },
  description:
    "Türkiye'nin en hızlı sondaj ve matkap yedek parçası tedarikçisi. Kaliteli ürünler, hızlı teslimat.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "BK Drilling",
    url: "/",
    title: "BK Drilling - Sondaj ve Matkap Yedek Parçaları",
    description:
      "Türkiye'nin en hızlı sondaj ve matkap yedek parçası tedarikçisi. Kaliteli ürünler, hızlı teslimat.",
    images: [
      {
        url: "/images/bk-drilling-logo.png",
        width: 1200,
        height: 630,
        alt: "BK Drilling",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "BK Drilling - Sondaj ve Matkap Yedek Parçaları",
    description:
      "Türkiye'nin en hızlı sondaj ve matkap yedek parçası tedarikçisi. Kaliteli ürünler, hızlı teslimat.",
    images: ["/images/bk-drilling-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["sondaj", "matkap", "yedek parça", "drilling", "bk drilling"],
};

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function getJsonLd(): string {
  const siteUrl = getSiteUrl();
  const nowYear = new Date().getFullYear();

  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "BK Drilling",
      url: siteUrl,
      logo: `${siteUrl}/images/bk-drilling-logo.png`,
      foundingDate: `${nowYear}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "BK Drilling",
      url: siteUrl,
      inLanguage: "tr-TR",
    },
  ]);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getJsonLd() }}
        />
      </head>
      <body className={`${quicksand.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
