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
  title: "BK Drilling - Sondaj ve Matkap Yedek Parçaları",
  description: "Türkiye'nin en hızlı sondaj ve matkap yedek parçası tedarikçisi. Kaliteli ürünler, hızlı teslimat.",
  keywords: ["sondaj", "matkap", "yedek parça", "drilling", "bk drilling"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${quicksand.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
