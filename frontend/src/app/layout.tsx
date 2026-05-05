import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saasquatch-leads-scraper.vercel.app/'),
  title: "SaaSquatch Pro - Scrape Leads from Google Maps in 2 Minutes",
  description: "The easiest and fastest way to build your sales list from Google Maps. Get names, phones, websites, and ratings with one click. Free Chrome Extension.",
  keywords: ["Google Maps Scraper", "Lead Generation", "Sales Tools", "B2B Leads", "SaaSquatch Pro"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#020617] text-white`}>
        {children}
      </body>
    </html>
  );
}
